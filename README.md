# logM v0.1.1 (beta)

[![npm package][npm-img]][npm-url]
![Visitors](https://visitor-badge.laobi.icu/badge?page_id=prakhart111.logM)

> Logging & Monitoring Package that comes with a log-location script, useful for plugin/extensions environments where actual line numbers aren't accesible.
> Log Batching for production. In prod mode, all logs will be pushed in an array and sent to the server in batches after you call the flush method.
> Sample Usecase: Logging & Monitoring in Figma Plugins.

## Install

```bash
npm install @prakhartandon_org/logm
```

## Usage

```ts
import LogMonitor from "@prakhartandon_org/logm"

// initialize the log monitor
const Logger = new LogMonitor("dev") // pass "prod" for production, default is "dev"
Logger.log("Hello from my package")
Logger.warn("Hello from my package")
Logger.info("Hello from my package")
Logger.error("Hello from my package")

//=> 'hello from my package'
```

## Log Styling

- Contains some default styling for the logs, based on the type.

## Helper Functions

- flush - To clear the logs batch (dev mode) and send the logs to the server (prod mode).
- getBatchSize - To get the batch size for the logs.
- getBatch - To get the batch of logs.
- setIdLogM: To set the id for the logM instance. (maybe send userID here, that'll help in searching logs for a particular user.)

## Log Location (Line Number) Script

This package also comes with a script that can be used to log the line number of the log statement. This uses fs and path modules to read the file & append the line number to the log, warn, info & error statements.

```bash
# Run script:
node ./node_modules/@prakhartandon_org/logm/lib/setLineNumScript.js <paths>
```

- `<paths>`: Paths to the directories where you want to append the line number to the log statements.
- Example: `node ./node_modules/@prakhartandon_org/logm/lib/setLineNumScript.js ./ui ./plugin`

### Logs after running the script

```ts
Logger.log("[ @Location: index.ts:1 ]", "Hello from my package")
Logger.warn("[ @Location: index.ts:1 ]", "Hello from my package")
Logger.info("[ @Location: index.ts:1 ]", "Hello from my package")
Logger.error("[ @Location: index.ts:1 ]", "Hello from my package")
```

## Production Mode

- In production mode, the logs are not displayed in the console.
- The logs will be sent to the server of your choice.
- You can set the POST Endpoint & API Token in the `LogMonitor` constructor.

```ts
const Logger = new LogMonitor("prod", "https://your-endpoint.com", "Bearer <your-api-token>")
```

## Contributing

Feel free to submit a pull request if you find any bugs or want to add new features.

[npm-img]: https://img.shields.io/npm/v/@prakhartandon_org/logm
[npm-url]: https://www.npmjs.com/package/@prakhartandon_org/logm
