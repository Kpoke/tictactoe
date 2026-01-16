/**
 * Logging utility for consistent error and debug logging throughout the application.
 * Provides environment-aware logging that can be easily replaced with a logging service.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface Logger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

/**
 * Creates a logger instance with environment-aware behavior
 * In production, only errors and warnings are logged
 */
const createLogger = (): Logger => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const log = (level: LogLevel, ...args: unknown[]): void => {
    // In production, only log errors and warnings
    if (!isDevelopment && (level === "debug" || level === "info")) {
      return;
    }

    // Use appropriate console method
    switch (level) {
      case "debug":
        console.debug(...args);
        break;
      case "info":
        console.info(...args);
        break;
      case "warn":
        console.warn(...args);
        break;
      case "error":
        console.error(...args);
        // In production, you might want to send errors to a logging service
        // Example: errorTrackingService.captureException(args[0]);
        break;
    }
  };

  return {
    debug: (...args: unknown[]) => log("debug", ...args),
    info: (...args: unknown[]) => log("info", ...args),
    warn: (...args: unknown[]) => log("warn", ...args),
    error: (...args: unknown[]) => log("error", ...args),
  };
};

const logger = createLogger();

export default logger;
