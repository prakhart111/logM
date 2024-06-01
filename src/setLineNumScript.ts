import fs from "fs";
import path from "path";

export function processDirectory(dirPath: string) {
  // check if given path exists
  if (!fs.existsSync(dirPath)) {
    console.error("The path provided does not exist");
    return;
  }

  // Check if the path is a directory
  if (!fs.lstatSync(dirPath).isDirectory()) {
    console.error("The path provided is not a directory");
    return;
  }

  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (
      path.extname(file) === ".ts" ||
      path.extname(file) === ".tsx" ||
      path.extname(file) === ".js" ||
      path.extname(file) === ".jsx"
    ) {
      annotateLogs(filePath);
    }
  });
}

function annotateLogs(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath);
  const lines = fileContent.split("\n");

  const annotatedLines = lines.map((line, index) => {
    // find out if the line contains a log method
    if (
      line.includes(".log(") ||
      line.includes(".error(") ||
      line.includes(".warn(") ||
      line.includes(".info(")
    ) {
      const logContentInsideRoundBrackets = line.match(/\(([^)]+)\)/);
      if (logContentInsideRoundBrackets) {
        const logContent = logContentInsideRoundBrackets[1];

        // avoid duplication
        if (logContent.includes("@Location:")) {
          // if the line already contains the location, remove the complete [] block
          const logContentWithoutLocation = logContent.replace(
            /"\[ @Location:.* \]", /,
            ""
          );
          // and add the new location
          return line.replace(
            logContent,
            `"[ @Location: ${fileName}:${
              index + 1
            } ]", ${logContentWithoutLocation}`
          );
        }
        return line.replace(
          logContent,
          `"[ @Location: ${fileName}:${index + 1} ]", ${logContent}`
        );
      }
    }

    // if the line does not contain a log method, return the line as is
    return line;
  });

  const annotatedContent = annotatedLines.join("\n");
  fs.writeFileSync(filePath, annotatedContent, "utf8");
}

// const pathsProvided = process.argv.slice(2);

// export const runLineNumScript = () => {
//   pathsProvided.forEach(function (val, index, array) {
//     console.log(index + ": " + val);
//     processDirectory(val);
//   });
// };
