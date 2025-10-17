'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';

export interface CartItem {
  isbn: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (isbn: string) => void;
  updateQuantity: (isbn: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (isbn: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'cart_v1';

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p) =>
        p &&
        typeof p.isbn === 'string' &&
        typeof p.title === 'string' &&
        typeof p.price === 'number' &&
        typeof p.quantity === 'number'
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // hydrate
  useEffect(() => {
    setItems(loadFromStorage());
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
      setItems((previous) => {
        const existing = previous.find((p) => p.isbn === item.isbn);
        if (existing) {
          return previous.map((p) =>
            p.isbn === item.isbn ? { ...p, quantity: p.quantity + quantity } : p
          );
        }
        return [...previous, { ...item, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback((isbn: string) => {
    setItems((previous) => previous.filter((p) => p.isbn !== isbn));
  }, []);

  const updateQuantity = useCallback((isbn: string, quantity: number) => {
    setItems((previous) =>
      previous.map((p) =>
        p.isbn === isbn ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (isbn: string) => items.some((index) => index.isbn === isbn),
    [items]
  );

  const totalItems = items.reduce((s, index) => s + index.quantity, 0);
  const totalPrice = items.reduce(
    (s, index) => s + index.quantity * index.price,
    0
  );

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
