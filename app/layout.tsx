'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssVarsProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '@/config/theme';
import { lato } from '@/config/fonts';
import Navigation from '@/components/Navigation/Navigation';
import { CartProvider } from '@/shared/contexts/CartContext';

export default function Layout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html
      lang="en"
      className={lato.className}
    >
      <body>
        <QueryClientProvider client={queryClient}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <CssVarsProvider
              theme={theme}
              defaultMode="dark"
              disableTransitionOnChange
            >
              <CssBaseline />
              <CartProvider>
                <Navigation />
                <main>{children}</main>
              </CartProvider>
            </CssVarsProvider>
          </AppRouterCacheProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
