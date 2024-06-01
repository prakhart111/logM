import { LogMonitor } from "./LogMonitor";
import { processDirectory } from "./setFileNumScript";
export const LogM = LogMonitor;

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
