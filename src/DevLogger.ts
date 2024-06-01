const DevLogger = {
  log(logMessage: string, style: string, content: string) {
    console.log(`%c${logMessage}`, style, content);
  },

  error(logMessage: string, style: string, content: string) {
    console.error(`%c${logMessage}`, style, content);
  },

  warn(logMessage: string, style: string, content: string) {
    console.warn(`%c${logMessage}`, style, content);
  },

  info(logMessage: string, style: string, content: string) {
    console.info(`%c${logMessage}`, style, content);
  },
};

export { DevLogger };
