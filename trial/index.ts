import LogMonitor from "../lib/index";

const test = () => {
  const t = {
    name: "test",
    age: 20,
  };
  const Logger = new LogMonitor("dev");
  Logger.log("[ @Location: index.ts:9 ]", "testing", "abc");
  Logger.log("[ @Location: index.ts:10 ]", "testing", "abc", t);
  Logger.error("[ @Location: index.ts:11 ]", "testing", "abc");
};

test();
