import '@testing-library/jest-dom/vitest';
import { createSerializer } from '@emotion/jest';
import { matchers } from '@emotion/jest';
import { cleanup } from '@testing-library/react';

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
