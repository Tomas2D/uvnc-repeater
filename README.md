# 💻 🔄 ultravnc-repeater

UltraVNC Repeater Implementation in Node.js, for use as a library within a larger application or as a standalone CLI tool.
This library draws inspiration from the [Perl implementation](https://github.com/tomka/ultravnc-repeater/).

Show some love and ⭐️ this project!

## Library

### Installation

```shell
yarn add ultravnc-repeater
```

```shell
npm install ultravnc-repeater
```

```typescript
// CommonJS
const { UltraVNCRepeater } = require("ultravnc-repeater");

// ESM / Typescript
import { UltraVNCRepeater } from "ultravnc-repeater";
```

## Examples

**Minimal working setup**

```typescript
import { UltraVNCRepeater } from "ultravnc-repeater";

const repeater = new UltraVNCRepeater();

// The server gateway will be started on port 5500.
// The client gateway will be started on port 5900.
await repeater.start();
```

**Custom settings**

```typescript
import { UltraVNCRepeater } from "ultravnc-repeater";

const repeater = new UltraVNCRepeater({
  serverPort: 5500,
  clientPort: 5900,

  // Reads and waits for the first N bytes from an incoming connection.
  // In this data chunk, the target ID should be contained.
  bufferSize: 250,

  // Prevents multiple connections to the same target.
  refuse: true,

  // Does not send "RFB 000.000" to the client when the connection starts.
  noRFB: false,

  // Specify a custom path for logging (default is standard output).
  logFile: "/tmp/repeater.log",

  // Log levels: "info", "debug", "fatal", "warn", "trace", "error", "warn", "silent".
  logLevel: "debug",

  // Timeout in seconds (in case of inactivity) for all connections.
  socketTimeout: 60 * 5,

  // Time in seconds for a graceful shutdown (close() method or on SIGTERM/SIGINT signal).
  killTimeout: 30,
});

await repeater.start();
// ...
// ...
await repeater.stop();
```

**Custom logger**

```typescript
import {
  UltraVNCRepeater,
  createLogger,
  createFileLogger, // for files
} from "ultravnc-repeater";

const repeater = new UltraVNCRepeater({
  logger: createLogger({
    /* custom options for a pino logger */
  }),
});
await repeater.start();
```

**Custom logic**

If you want to extend the repeater functionality, you can extend the `UltraVNCRepeater` class and override some of its methods.

```typescript
import {
  UltraVNCRepeater,
  NewClientConnectionEvent,
  NewServerConnectionEvent,
  CloseConnectionEvent,
} from "ultravnc-repeater";
import { Socket } from "node:net";

class MyRepeater extends UltraVNCRepeater {
  constructor(options: Partial<VNCRepeaterOptions>) {
    super(options);
  }

  protected async _onNewClient(event: NewClientConnectionEvent): Promise<void> {
    await super._onNewClient(event);
    // do something
  }

  protected async _onCloseClient(event: CloseConnectionEvent): Promise<void> {
    await super._onCloseClient(event);
    // do something
  }

  protected async _onNewServer(event: NewServerConnectionEvent): Promise<void> {
    return super._onNewServer(event);
    // do something
  }

  protected async _onCloseServer(event: CloseConnectionEvent): Promise<void> {
    await super._onCloseServer(event);
    // do something
  }
}

const repeater = new UltraVNCRepeater({
  level: "debug",
});
await repeater.start();
// ...
// ...
await repeater.stop();
```

## CLI

If you want to use the repeater as is, you can install it as a CLI tool.

### Global Installation

```shell
yarn global add ultravnc-repeater
```

```shell
npm install -g ultravnc-repeater
```

### Commands

**Show Help**

```shell
ultravnc-repeater --help
```

**Start Repeater**

```shell
ultravnc-repeater
```

**Start Repeater with Custom Options**

```shell
ultravnc-repeater --serverPort 5555
```

Or use environmental variables (or both) to set custom options.

```shell
REPEATER_SERVER_PORT=5555 ultravnc-repeater
```

To list all possible options, see help (`ultravnc-repeater --help`)
