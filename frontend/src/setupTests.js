// frontend/src/setupTests.js
import '@testing-library/jest-dom';

// Mocking the ResizeObserver (required for Framer Motion and RainbowKit)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};