import localFont from 'next/font/local';

/**
 * Set up local font
 * cf. https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts
 */
const lato = localFont({
  src: [
    {
      path: '../assets/fonts/lato-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/lato-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/lato-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

/**
 * Export const to share across the app
 * cf. https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts
 */
export { lato };
