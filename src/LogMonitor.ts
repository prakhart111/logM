import { DevLogger } from "./DevLogger";
import { ProdLogger } from "./ProdLogger";

class LogMonitor {
  mode = "dev"; // dev, prod

  constructor(mode: string) {
    this.mode = mode;
  }

  log(location: string, content?: any) {
    // style and construct the log message
    const logMessage = `${location} \n`;
    const style = "text-decoration: underline; font-weight: bold;";
    if (this.mode === "dev") {
      DevLogger.log(logMessage, style, content);
    } else {
      ProdLogger.log(logMessage, style, content);
    }
  }

  error(location: string, content?: any) {
    // style and construct the log message
    const logMessage = `${location} \n`;
    const style = "color: red; font-weight: bold;";
    if (this.mode === "dev") {
      DevLogger.error(logMessage, style, content);
    } else {
      ProdLogger.error(logMessage, style, content);
    }
  }

  warn(location: string, content?: any) {
    // style and construct the log message
    const logMessage = `${location} \n`;
    const style =
      "text-decoration: underline; font-weight: bold; color: orange;";
    if (this.mode === "dev") {
      DevLogger.warn(logMessage, style, content);
    } else {
      ProdLogger.warn(logMessage, style, content);
    }
  }

  info(location: string, content?: any) {
    // style and construct the log message
    const logMessage = `${location} \n`;
    const style = "text-decoration: underline; font-weight: bold; color: blue;";
    if (this.mode === "dev") {
      DevLogger.info(logMessage, style, content);
    } else {
      ProdLogger.info(logMessage, style, content);
    }
  }
}

export { LogMonitor };
