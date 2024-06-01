const ProdLogger = {
  log(logMessage: string, style: string, content: string) {
    console.log(`%c${logMessage}`, style, content);
    // send to server
  },

  error(logMessage: string, style: string, content: string) {
    console.error(`%c${logMessage}`, style, content);
    // send to server
  },

  warn(logMessage: string, style: string, content: string) {
    console.warn(`%c${logMessage}`, style, content);
    // send to server
  },

  info(logMessage: string, style: string, content: string) {
    console.info(`%c${logMessage}`, style, content);
    // send to server
  },
};

export { ProdLogger };
