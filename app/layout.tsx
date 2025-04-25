import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { FC } from 'react';
import { LayoutProps } from '@/app/interfaces';
import theme from '@/config/theme';
import { lato } from '@/config/fonts';
import { Navigation } from '@/components/Navigation';

export const metadata = {
  title: {
    default: 'OEV Frontend Template',
    template: 'OEV | %s',
  },
  description: 'Meta description',
  robots: {
    index: true,
  },
};

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => (
  <html
    lang="en"
    className={lato.className}
  >
    <body>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default Layout;
