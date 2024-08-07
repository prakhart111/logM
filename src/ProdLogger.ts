const ProdLogger = {
  log(prodPOSTEndpoint: string, prodPOSTAuthToken: string, logLocation: string, style: string, ...content: unknown[]) {
    postToServer("LOG", prodPOSTEndpoint, prodPOSTAuthToken, logLocation, ...content)
  },

  error(prodPOSTEndpoint: string, prodPOSTAuthToken: string, logLocation: string, style: string, ...content: unknown[]) {
    postToServer("ERROR", prodPOSTEndpoint, prodPOSTAuthToken, logLocation, ...content)
  },

  warn(prodPOSTEndpoint: string, prodPOSTAuthToken: string, logLocation: string, style: string, ...content: unknown[]) {
    postToServer("WARN", prodPOSTEndpoint, prodPOSTAuthToken, logLocation, ...content)
  },

  info(prodPOSTEndpoint: string, prodPOSTAuthToken: string, logLocation: string, style: string, ...content: unknown[]) {
    postToServer("INFO", prodPOSTEndpoint, prodPOSTAuthToken, logLocation, ...content)
  },
}

// api call
const postToServer = async (type: string, prodPOSTEndpoint: string, prodPOSTAuthToken: string, logLocation: string, ...content: unknown[]) => {
  const data = [
    {
      type,
      logLocation,
      ...content,
    },
  ]

  if (!isValidEndpoint(prodPOSTEndpoint)) {
    throw new Error("Invalid endpoint")
  }

  const response = await fetch(prodPOSTEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: prodPOSTAuthToken,
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    console.log("logM_beta: Log sent to server")
  } else {
    console.error("logM_beta: Error sending log to server, check the endpoint and auth token and API request format for the server")
  }
}

export const postLogBatchToServer = async (prodPOSTEndpoint: string, prodPOSTAuthToken: string, logBatch: unknown[]) => {
  try {
    if (!logBatch.length) {
      return
    }

    if (!isValidEndpoint(prodPOSTEndpoint)) {
      throw new Error("Invalid endpoint")
    }

    const response = await fetch(prodPOSTEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: prodPOSTAuthToken,
      },
      body: JSON.stringify(logBatch),
    })

    if (response.ok) {
      // console.log("logM_beta: Log batch sent to server")
    } else {
      throw new Error("Error sending log batch to server")
    }
  } catch (error: any) {
    console.error("Error message: ", error?.message || error)
    console.error(
      "logM_beta: Something Went Wrong while Flushing! Visit the docs https://www.npmjs.com/package/@prakhartandon_org/logm for more info."
    )
    return
  }
}

const isValidEndpoint = (endpoint: string) => {
  return endpoint.startsWith("http://") || endpoint.startsWith("https://")
}

export { ProdLogger }
