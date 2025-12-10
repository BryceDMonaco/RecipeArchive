/**
 * Utility for conditional logging based on environment
 * In development, logs to console. In production, silent (can be extended to send to error tracking)
 */
const logger = {
  error: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.error(...args);
    }
    // TODO: In production, send to error tracking service (e.g., Sentry)
  },

  warn: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },

  info: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.info(...args);
    }
  },

  debug: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.debug(...args);
    }
  },
};

export default logger;
