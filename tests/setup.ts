import { beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/dom';

// Cleanup after each test
beforeEach(() => {
  cleanup();
});
