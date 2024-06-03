// saving to server functionality to be done.

const ProdLogger = {
  log(logMessage: string, style: string, ...content: any[]) {
    console.log(`%c${logMessage}`, style, ...content);
  },

  error(logMessage: string, style: string, ...content: any[]) {
    console.error(`%c${logMessage}`, style, ...content);
  },

  warn(logMessage: string, style: string, ...content: any[]) {
    console.warn(`%c${logMessage}`, style, ...content);
  },

  info(logMessage: string, style: string, ...content: any[]) {
    console.info(`%c${logMessage}`, style, ...content);
  },
};

export { ProdLogger };
