import { DevLogger } from './DevLogger'
import { ProdLogger } from './ProdLogger'

class LogMonitor {
  mode: 'dev' | 'prod'
  prodPOSTEndpoint: string
  prodPOSTAuthToken: string

  constructor(mode: 'dev' | 'prod', prodPOSTEndpoint?: string, prodPOSTAuthToken?: string) {
    this.mode = mode
    if (mode === 'prod' && (!prodPOSTEndpoint || !prodPOSTAuthToken)) {
      throw new Error("prodPOSTEndpoint and prodPOSTAuthToken are required when mode is 'prod'")
    }
    if (mode === 'prod' && typeof prodPOSTEndpoint === 'string' && typeof prodPOSTAuthToken === 'string') {
      this.prodPOSTEndpoint = prodPOSTEndpoint
      this.prodPOSTAuthToken = prodPOSTAuthToken
    } else {
      this.prodPOSTEndpoint = 'NA'
      this.prodPOSTAuthToken = 'NA'
    }
  }

  log(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logLocation: string = `${location} \n`
    const style: string = 'font-weight: bold;'
    if (this.mode === 'dev') {
      DevLogger.log(logLocation, style, ...contents)
    } else {
      ProdLogger.log(this.prodPOSTEndpoint, this.prodPOSTAuthToken, logLocation, style, ...contents)
    }
  }

  error(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logLocation: string = `${location} \n`
    const style: string = 'color: red; font-weight: bold;'
    if (this.mode === 'dev') {
      DevLogger.error(logLocation, style, ...contents)
    } else {
      ProdLogger.error(this.prodPOSTEndpoint, this.prodPOSTAuthToken, logLocation, style, ...contents)
    }
  }

  warn(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logLocation: string = `${location} \n`
    const style: string = 'font-weight: bold; color: orange;'
    if (this.mode === 'dev') {
      DevLogger.warn(logLocation, style, ...contents)
    } else {
      ProdLogger.warn(this.prodPOSTEndpoint, this.prodPOSTAuthToken, logLocation, style, ...contents)
    }
  }

  info(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logLocation: string = `${location} \n`
    const style: string = 'font-weight: bold; color: blue;'
    if (this.mode === 'dev') {
      DevLogger.info(logLocation, style, ...contents)
    } else {
      ProdLogger.info(this.prodPOSTEndpoint, this.prodPOSTAuthToken, logLocation, style, ...contents)
    }
  }
}

export { LogMonitor }
