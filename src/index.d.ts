declare class LogMonitor {
  mode: "dev" | "prod";
  constructor(mode: "dev" | "prod");
  log(location: string, ...contents: any[]): void;
  error(location: string, ...contents: any[]): void;
  warn(location: string, ...contents: any[]): void;
  info(location: string, ...contents: any[]): void;
}

export default LogMonitor;
