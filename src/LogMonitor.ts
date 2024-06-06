import { DevLogger } from "./DevLogger";
import { ProdLogger } from "./ProdLogger";

class LogMonitor {
  mode: "dev" | "prod";

  constructor(mode: "dev" | "prod") {
    this.mode = mode;
  }

  log(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logMessage: string = `${location} \n`;
    const style: string = "font-weight: bold;";
    if (this.mode === "dev") {
      DevLogger.log(logMessage, style, ...contents);
    } else {
      ProdLogger.log(logMessage, style, ...contents);
    }
  }

  error(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logMessage: string = `${location} \n`;
    const style: string = "color: red; font-weight: bold;";
    if (this.mode === "dev") {
      DevLogger.error(logMessage, style, ...contents);
    } else {
      ProdLogger.error(logMessage, style, ...contents);
    }
  }

  warn(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logMessage: string = `${location} \n`;
    const style: string = "font-weight: bold; color: orange;";
    if (this.mode === "dev") {
      DevLogger.warn(logMessage, style, ...contents);
    } else {
      ProdLogger.warn(logMessage, style, ...contents);
    }
  }

  info(location: string, ...contents: any[]): void {
    // style and construct the log message
    const logMessage: string = `${location} \n`;
    const style: string = "font-weight: bold; color: blue;";
    if (this.mode === "dev") {
      DevLogger.info(logMessage, style, ...contents);
    } else {
      ProdLogger.info(logMessage, style, ...contents);
    }
  }
}

export { LogMonitor };
