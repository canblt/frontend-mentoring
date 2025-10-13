// Global mock for next/font/local used via vitest alias in vitest.config.mts
// Provides minimal shape expected by code consuming the imported font.
// If additional properties are needed, extend here once and all tests get it.

interface LocalFontReturn {
  style: { fontFamily: string };
  className: string;
  variable: string;
}

// Default export mimics the API: import localFont from 'next/font/local'; const f = localFont({ src: [...] })
export default function localFontMock(_options: any): LocalFontReturn {
  return {
    style: { fontFamily: 'MockedFont, system-ui, sans-serif' },
    className: 'mocked-font-class',
    variable: '--mocked-font',
  };
}

