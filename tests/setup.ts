import 'vitest';

import type { AxeMatchers as AxeMatchersType } from 'vitest-axe/matchers';
import * as AxeMatchers from 'vitest-axe/matchers';

declare module 'vitest' {
  export interface Assertion extends AxeMatchersType {}
  export interface AsymmetricMatchersContaining extends AxeMatchersType {}
}

beforeAll(() => {
  expect.extend(AxeMatchers);
});
