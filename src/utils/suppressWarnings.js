// Suppress Ant Design compatibility warnings
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('antd v5 support React is 16 ~ 18')) {
      return; // Suppress this specific warning
    }
    originalWarn.apply(console, args);
  };
}