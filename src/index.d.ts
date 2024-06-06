declare class LogMonitor {
  mode: "dev" | "prod";
  constructor(mode: "dev" | "prod");
  log(location: string, ...contents: unknown[]): void;
  error(location: string, ...contents: unknown[]): void;
  warn(location: string, ...contents: unknown[]): void;
  info(location: string, ...contents: unknown[]): void;
}

declare module "@prakhartandon_org/logm" {
  export default LogMonitor;
}
