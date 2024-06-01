const ProdLogger = {
  log(logMessage: string, style: string, content: any) {
    console.log(`%c${logMessage}`, style, content);
    // send to server
    console.log("Log Saving to be implemented");
  },

  error(logMessage: string, style: string, content: any) {
    console.error(`%c${logMessage}`, style, content);
    // send to server
    console.log("Log Saving to be implemented");
  },

  warn(logMessage: string, style: string, content: any) {
    console.warn(`%c${logMessage}`, style, content);
    // send to server
    console.log("Log Saving to be implemented");
  },

  info(logMessage: string, style: string, content: any) {
    console.info(`%c${logMessage}`, style, content);
    // send to server
    console.log("Log Saving to be implemented");
  },
};

export { ProdLogger };
