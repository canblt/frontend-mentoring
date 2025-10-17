'use client';
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import { useCart } from '@/shared/contexts/CartContext';
import PageShell from '@shared/components/PageShell/PageShell';
import DetailPanel from '@shared/components/DetailPanel/DetailPanel';

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const hasItems = items.length > 0;
  return (
    <PageShell
      title="Your Cart"
      subtitle={
        hasItems
          ? 'Review your selected books and adjust quantities before checkout.'
          : 'Your cart is currently empty.'
      }
      badgeLabel="Cart"
      maxWidth={1100}
    >
      <DetailPanel>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          m={5}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ fontSize: { xs: '26px', md: '34px' } }}
          >
            Items
          </Typography>
          {hasItems && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearCart}
              data-testid="clear-cart-btn"
            >
              Clear Cart
            </Button>
          )}
        </Stack>
        {!hasItems && (
          <Typography
            variant="body1"
            color="text.secondary"
          >
            Your cart is empty. Browse <Link href="/books">books</Link> to add
            some.
          </Typography>
        )}
        {hasItems && (
          <>
            <TableContainer
              component={Paper}
              sx={{ mb: 3, boxShadow: 'none', backgroundImage: 'none' }}
            >
              <Table
                size="small"
                aria-label="cart table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>ISBN</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell
                      align="center"
                      aria-label="actions"
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.isbn}
                      hover
                    >
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.isbn}</TableCell>
                      <TableCell align="right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <IconButton
                            size="small"
                            aria-label={`decrease ${item.title}`}
                            onClick={() =>
                              updateQuantity(item.isbn, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            –
                          </IconButton>
                          <Typography
                            variant="body2"
                            minWidth={24}
                            textAlign="center"
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            aria-label={`increase ${item.title}`}
                            onClick={() =>
                              updateQuantity(item.isbn, item.quantity + 1)
                            }
                          >
                            +
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label={`remove ${item.title}`}
                          size="small"
                          onClick={() => removeItem(item.isbn)}
                        >
                          ×
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1">Items: {totalItems}</Typography>
              <Typography
                variant="h5"
                fontWeight={700}
                data-testid="cart-total"
              >
                Total: ${totalPrice.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={!hasItems}
                data-testid="checkout-btn"
              >
                Proceed to Checkout (Demo)
              </Button>
            </Box>
          </>
        )}
      </DetailPanel>
    </PageShell>
  );
}
