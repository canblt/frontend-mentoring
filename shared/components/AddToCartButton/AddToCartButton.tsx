'use client';
import React from 'react';
import {
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { useCart } from '@/shared/contexts/CartContext';

export interface AddToCartButtonProps {
  isbn: string;
  title: string;
  price: number;
  sx?: SxProps;
  size?: 'small' | 'medium' | 'large';
}

export function AddToCartButton({
  isbn,
  title,
  price,
  sx,
  size = 'small',
}: AddToCartButtonProps) {
  const { addItem, isInCart, items, updateQuantity, removeItem } = useCart();
  const inCart = isInCart(isbn);
  const current = items.find((index) => index.isbn === isbn);

  if (!inCart) {
    return (
      <Button
        variant="contained"
        color="primary"
        size={size}
        onClick={() => addItem({ isbn, title, price }, 1)}
        sx={sx}
        data-testid="add-to-cart-btn"
      >
        Add to Cart
      </Button>
    );
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={sx}
      data-testid="in-cart-controls"
    >
      <ButtonGroup
        size={size}
        variant="outlined"
        aria-label="quantity controls"
      >
        <IconButton
          aria-label="decrease quantity"
          size={size}
          onClick={() => current && updateQuantity(isbn, current.quantity - 1)}
          disabled={(current?.quantity || 0) <= 1}
          data-testid="decrease-qty-btn"
        >
          −
        </IconButton>
        <Button
          disabled
          sx={{ pointerEvents: 'none', minWidth: 48 }}
          data-testid="qty-display"
        >
          {current?.quantity ?? 0}
        </Button>
        <IconButton
          aria-label="increase quantity"
          size={size}
          onClick={() => current && updateQuantity(isbn, current.quantity + 1)}
          data-testid="increase-qty-btn"
        >
          +
        </IconButton>
      </ButtonGroup>
      <Typography
        variant="body2"
        sx={{ minWidth: 90 }}
        data-testid="line-price"
      >
        ${(price * (current?.quantity ?? 1)).toFixed(2)}
      </Typography>
      <IconButton
        aria-label="remove item"
        color="error"
        size={size}
        onClick={() => removeItem(isbn)}
        data-testid="remove-item-btn"
      >
        ×
      </IconButton>
    </Stack>
  );
}
