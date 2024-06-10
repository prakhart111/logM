// Separate script to add the location of the log statement in the log message
// to run this script, run the following command in the terminal:
// node ./node_modules/@prakhartandon_org/logm/lib/setLineNumScript.js <paths-to-directory>
// no direct path has been set yet, so you'll need to run by manually targeting as above.

import fs from "fs"
import path from "path"

export function processDirectory(dirPath: string) {
  // check if given path exists
  if (!fs.existsSync(dirPath)) {
    console.error("The path provided does not exist")
    return
  }

  // Check if the path is a directory
  if (!fs.lstatSync(dirPath).isDirectory()) {
    console.error("The path provided is not a directory")
    return
  }

  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      processDirectory(filePath)
    } else if (path.extname(file) === ".ts" || path.extname(file) === ".tsx" || path.extname(file) === ".js" || path.extname(file) === ".jsx") {
      annotateLogs(filePath)
    }
  })
}

function annotateLogs(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf8")
  const fileName = path.basename(filePath)
  const lines = fileContent.split("\n")

  const annotatedLines = lines.map((line, index) => {
    // find out if the line contains a log method
    if (line.includes(".log(") || line.includes(".error(") || line.includes(".warn(") || line.includes(".info(")) {
      const logContentInsideRoundBrackets = line.match(/\(([^)]+)\)/)
      if (logContentInsideRoundBrackets) {
        const logContent = logContentInsideRoundBrackets[1]

        // avoid duplication
        if (logContent.includes("@Location:")) {
          // if the line already contains the location, remove the complete [] block
          // handling both single and double quotes ( incase prittier changes the quotes )
          const logContentWithoutLocation = logContent.replace(/"\[ @Location:.* \]", /, "").replace(/'\[ @Location:.* \]', /, "")
          console.log("Location already exists in the log message", logContentWithoutLocation)
          // and add the new location
          return line.replace(logContent, `"[ @Location: ${fileName}:${index + 1} ]", ${logContentWithoutLocation}`)
        }
        return line.replace(logContent, `"[ @Location: ${fileName}:${index + 1} ]", ${logContent}`)
      }
    }

    // if the line does not contain a log method, return the line as is
    return line
  })

  const annotatedContent = annotatedLines.join("\n")
  fs.writeFileSync(filePath, annotatedContent, "utf8")
}
try {
  const pathsProvided = process.argv?.slice(2)

  const runLineNumScript = () => {
    pathsProvided.forEach(function (val, index, array) {
      console.log(index + ": " + val)
      processDirectory(val)
    })
  }
  if (!pathsProvided) {
    throw new Error("No paths provided")
  } else {
    runLineNumScript()
  }
} catch (e: any) {
  console.error(e.message)
}
