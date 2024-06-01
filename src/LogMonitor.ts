import { DevLogger } from "./DevLogger";
import { ProdLogger } from "./ProdLogger";

class LogMonitor {
  mode = "dev"; // dev, prod

  constructor(mode: string) {
    this.mode = mode;
  }

  log(location: string, heading?: string, content?: any, type = "LOG") {
    // style and construct the log message
    const logMessage = `${location} \n${heading}`;
    const style = "text-decoration: underline; font-weight: bold;";
    if (this.mode === "dev") {
      if (type === "LOG") {
        DevLogger.log(logMessage, style, content);
      } else if (type === "INFO") {
        DevLogger.info(logMessage, style, content);
      } else if (type === "WARN") {
        DevLogger.warn(logMessage, style, content);
      } else if (type === "ERROR") {
        DevLogger.error(location, style, content);
      }
    } else {
      if (type === "LOG") {
        ProdLogger.log(logMessage, style, content);
      } else if (type === "INFO") {
        ProdLogger.info(logMessage, style, content);
      } else if (type === "WARN") {
        ProdLogger.warn(logMessage, style, content);
      } else if (type === "ERROR") {
        ProdLogger.error(logMessage, style, content);
      }
    }
  }
}

export { LogMonitor };
