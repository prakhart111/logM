import { DevLogger } from "./DevLogger";
import { ProdLogger } from "./ProdLogger";

class LogMonitor {
  mode = "dev"; // dev, prod

  constructor(mode: string) {
    this.mode = mode;
  }

  log(location: string, ...contents: any[]) {
    // style and construct the log message
    const logMessage = `${location} \n`;
    const style = "font-weight: bold;";
    if (this.mode === "dev") {
      DevLogger.log(logMessage, style, ...contents);
    } else {
      ProdLogger.log(logMessage, style, ...contents);
    }
  }

  error(location: string, ...contents: any[]) {
    // style and construct the log message
    const logMessage = `${location} \n`;
    const style = "color: red; font-weight: bold;";
    if (this.mode === "dev") {
      DevLogger.error(logMessage, style, ...contents);
    } else {
      ProdLogger.error(logMessage, style, ...contents);
    }
  }

  warn(location: string, ...contents: any[]) {
    // style and construct the log message
    const logMessage = `${location} \n`;
    const style = "font-weight: bold; color: orange;";
    if (this.mode === "dev") {
      DevLogger.warn(logMessage, style, ...contents);
    } else {
      ProdLogger.warn(logMessage, style, ...contents);
    }
  }

  info(location: string, ...contents: any[]) {
    // style and construct the log message
    const logMessage = `${location} \n`;
    const style = "font-weight: bold; color: blue;";
    if (this.mode === "dev") {
      DevLogger.info(logMessage, style, ...contents);
    } else {
      ProdLogger.info(logMessage, style, ...contents);
    }
  }
}

export { LogMonitor };
