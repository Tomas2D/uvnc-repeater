# 💻 🔄 uvnc-repeater (UltraVNC Repeater)

UltraVNC Repeater Implementation in Node.js, for use as a library within a larger application or as a standalone CLI tool.
This library draws inspiration from the [Perl implementation](https://github.com/tomka/ultravnc-repeater/).

Show some love and ⭐️ this project!

## Library

### Installation

```shell
yarn add uvnc-repeater
```

```shell
npm install uvnc-repeater
```

```typescript
// CommonJS
const { UltraVNCRepeater } = require("uvnc-repeater");

// ESM / Typescript
import { UltraVNCRepeater } from "uvnc-repeater";
```

## Examples

**Minimal working setup**

```typescript
import { UltraVNCRepeater } from "uvnc-repeater";

const repeater = new UltraVNCRepeater();

// The server gateway will be started on port 5500.
// The client gateway will be started on port 5900.
await repeater.start();

// Get active connections (both client and server are defined)
const activeConnections = repeater.getActiveConnections();

// Get pending connections (either client or server will be defined)
const pendingConnections = repeater.getPendingConnections();

// Close repeater (pass true as first parameter to force shutdown)
await repeater.stop();
```

**Custom settings**

```typescript
import { UltraVNCRepeater } from "uvnc-repeater";

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
  // pass Infinity (Number.POSITIVE_INFINITY) to disable such a feature
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
} from "uvnc-repeater";

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
} from "uvnc-repeater";
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

const repeater = new MyRepeater({
  level: "debug",
});
await repeater.start();
// ...
// ...
await repeater.stop();
```

### Events

Because the core class `UltraVNCRepeater` extends the Node.js `EventEmitter`, one can listen for the following events.

```typescript
import { Event } from "uvnc-repeater";

// Repeater
Event.BEFORE_REPEATER_START;
Event.AFTER_REPEATER_START;
Event.BEFORE_REPEATER_STOP;
Event.AFTER_REPEATER_STOP;

// Repeater - server
Event.BEFORE_SERVER_GATEWAY_START;
Event.AFTER_SERVER_GATEWAY_START;
Event.BEFORE_SERVER_GATEWAY_STOP;
Event.AFTER_SERVER_GATEWAY_STOP;

// Repeater - client
Event.BEFORE_CLIENT_GATEWAY_START;
Event.AFTER_CLIENT_GATEWAY_START;
Event.BEFORE_CLIENT_GATEWAY_STOP;
Event.AFTER_CLIENT_GATEWAY_STOP;

// Server
Event.BEFORE_SERVER_CLOSE;
Event.AFTER_SERVER_CLOSE;
Event.BEFORE_SERVER_NEW;
Event.SERVER_NEW_ADDED_TO_PENDING;
Event.SERVER_NEW_PREVENT_HOOKUP;
Event.SERVER_NEW_HOOKUP;
Event.SERVER_NEW_OVERRIDE_OLD;

// Client
Event.BEFORE_CLIENT_NEW;
Event.CLIENT_NEW_HOOKUP_DIRECT;
Event.BEFORE_CLIENT_CLOSE;
Event.AFTER_CLIENT_CLOSE;
Event.CLIENT_NEW_ADDED_TO_PENDING;
Event.CLIENT_NEW_DIRECT_INVALID_PORT;
Event.CLIENT_NEW_DIRECT_INVALID_HOST;
Event.CLIENT_NEW_HOOKUP;
Event.CLIENT_NEW_PREVENT_HOOKUP;
Event.CLIENT_NEW_OVERRIDE_OLD;
```

**Example**

```typescript
import { UltraVNCRepeater, Event } from "uvnc-repeater";

const repeater = new UltraVNCRepeater();
repeater.on(Event.CLIENT_NEW_ADDED_TO_PENDING, (event) => {
  console.log(`Client with ID: ${event.id} is waiting for the server.`);
});
await repeater.start();
```

## ⌨️ CLI

If you want to use the repeater as is, you can install it as a CLI tool.

### Global Installation

```shell
yarn global add uvnc-repeater
```

```shell
npm install -g uvnc-repeater
```

### Commands

**Show Help**

```shell
uvnc-repeater --help
```

**Start Repeater**

```shell
uvnc-repeater
```

**Start Repeater with Custom Options**

```shell
uvnc-repeater --serverPort 5555
```

Or use environmental variables (or both) to set custom options.

```shell
REPEATER_SERVER_PORT=5555 uvnc-repeater
```

To list all possible options, see help (`uvnc-repeater --help`)

### 📃 TODO

- [ ] Tests
