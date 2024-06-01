import { LogMonitor } from "./LogMonitor";
import { processDirectory } from "./setLineNumScript";
export const Log = LogMonitor;

// check if operated from command line
if (process) {
  const pathsProvided = process.argv?.slice(2);

  const runLineNumScript = () => {
    pathsProvided.forEach(function (val, index, array) {
      console.log(index + ": " + val);
      processDirectory(val);
    });
  };

  if (!pathsProvided) {
    throw new Error("No paths provided");
  } else {
    runLineNumScript();
  }
} else {
  console.log("not running from command line");
}
