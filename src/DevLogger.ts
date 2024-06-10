const DevLogger = {
  log(logLocation: string, style: string, ...content: any[]) {
    console.log(`%c${logLocation}`, style, ...content);
  },

  error(logLocation: string, style: string, ...content: any[]) {
    console.error(`%c${logLocation}`, style, ...content);
  },

  warn(logLocation: string, style: string, ...content: any[]) {
    console.warn(`%c${logLocation}`, style, ...content);
  },

  info(logLocation: string, style: string, ...content: any[]) {
    console.info(`%c${logLocation}`, style, ...content);
  },
};

export { DevLogger };
