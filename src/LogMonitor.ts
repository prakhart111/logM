import { DevLogger } from "./DevLogger"
import { ProdLogger, postLogBatchToServer } from "./ProdLogger"

type LogBatchType = { type: string; logLocation: string; id: string; status: string; endpoint: string; data: unknown }
class LogMonitor {
  mode: "dev" | "prod"
  prodPOSTEndpoint: string
  prodPOSTAuthToken: string
  logBatch: LogBatchType[] = []
  id: string = "NA"

  constructor(mode: "dev" | "prod", prodPOSTEndpoint?: string, prodPOSTAuthToken?: string) {
    this.mode = mode
    this.id = "NA"
    if (mode === "prod" && (!prodPOSTEndpoint || !prodPOSTAuthToken)) {
      throw new Error("prodPOSTEndpoint and prodPOSTAuthToken are required when mode is 'prod'")
    }
    if (mode === "prod" && typeof prodPOSTEndpoint === "string" && typeof prodPOSTAuthToken === "string") {
      this.prodPOSTEndpoint = prodPOSTEndpoint
      this.prodPOSTAuthToken = prodPOSTAuthToken
    } else {
      this.prodPOSTEndpoint = "NA"
      this.prodPOSTAuthToken = "NA"
    }
  }

  setIdLogM(id: string) {
    this.id = id
  }

  getBatchSize() {
    return this.logBatch.length
  }

  getBatch() {
    return this.logBatch
  }

  async flush() {
    if (this.mode === "prod") {
      await postLogBatchToServer(this.prodPOSTEndpoint, this.prodPOSTAuthToken, this.logBatch)
    }
    this.logBatch = []
  }

  log(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logLocation: string = `${location} \n`
    const style: string = "font-weight: bold;"
    let status: string = "NA"
    let endpoint: string = "NA"

    if (this.mode === "dev") {
      DevLogger.log(logLocation, style, ...contents)
    } else {
      // ProdLogger.log(this.prodPOSTEndpoint, this.prodPOSTAuthToken, logLocation, style, ...contents)
      contents.map((content: any) => {
        if (content.status) {
          status = content.status
        }
        if (content.endpoint) {
          endpoint = content.endpoint
        }
      })
      this.logBatch.push({ type: "LOG", logLocation, id: this.id, status, endpoint, data: { ...contents } })
    }
  }

  error(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logLocation: string = `${location} \n`
    const style: string = "color: red; font-weight: bold;"
    let status: string = "NA"
    let endpoint: string = "NA"
    if (this.mode === "dev") {
      DevLogger.error(logLocation, style, ...contents)
    } else {
      contents.map((content: any) => {
        if (content.status) {
          status = content.status
        }
        if (content.endpoint) {
          endpoint = content.endpoint
        }
      })
      this.logBatch.push({ type: "ERROR", logLocation, id: this.id, status, endpoint, data: { ...contents } })
    }
  }

  warn(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logLocation: string = `${location} \n`
    const style: string = "font-weight: bold; color: orange;"
    let status: string = "NA"
    let endpoint: string = "NA"
    if (this.mode === "dev") {
      DevLogger.warn(logLocation, style, ...contents)
    } else {
      contents.map((content: any) => {
        if (content.status) {
          status = content.status
        }
        if (content.endpoint) {
          endpoint = content.endpoint
        }
      })
      this.logBatch.push({ type: "WARN", logLocation, id: this.id, status, endpoint, data: { ...contents } })
    }
  }

  info(location: string, ...contents: unknown[]): void {
    // style and construct the log message
    const logLocation: string = `${location} \n`
    const style: string = "font-weight: bold; color: blue;"
    let status: string = "NA"
    let endpoint: string = "NA"
    if (this.mode === "dev") {
      DevLogger.info(logLocation, style, ...contents)
    } else {
      contents.map((content: any) => {
        if (content.status) {
          status = content.status
        }
        if (content.endpoint) {
          endpoint = content.endpoint
        }
      })
      this.logBatch.push({ type: "INFO", logLocation, id: this.id, status, endpoint, data: { ...contents } })
    }
  }
}

export { LogMonitor }
