import { Socket } from "node:net";
import type { Logger, LogLevel } from "./logger.js";

export interface VNCRepeaterOptions {
  clientPort: number;
  serverPort: number;
  bufferSize: number;
  refuse: boolean;
  noRFB: boolean;
  logFile?: string;
  debug?: boolean;
  logger?: Logger;
  logLevel?: LogLevel;
  socketTimeout: number;
  closeSocketTimeout: number;
  socketFirstDataTimeout: number;
  keepAlive: number;
  keepAliveRetries: number;
  killTimeout?: number;
}

export type ConnectionId = string;
export interface ConnectionInfo {
  id?: ConnectionId;
  address?: string;
}
export type ActiveConnectionId = string;
export type PendingConnection =
  | {
      server: Socket;
      serverConnectedAt: Date;
      client: null;
      clientConnectedAt: null;
    }
  | {
      server: null;
      serverConnectedAt: null;
      client: Socket;
      clientConnectedAt: Date;
    };

export interface ActiveConnection {
  id: ConnectionId;
  server: Socket;
  serverConnectedAt: Date;
  client: Socket;
  clientConnectedAt: Date;
  establishedAt: Date;
}

export interface NewConnection {
  socket: Socket;
  createdAt: Date;
}

export interface BaseEvent {
  emittedAt: Date;
}

export interface CloseClientConnectionEvent extends BaseEvent {
  id?: ConnectionId;
  socket: Socket;
}
export interface CloseServerConnectionEvent extends BaseEvent {
  id: ConnectionId;
  socket: Socket;
}

export interface TimeoutClientConnectionEvent extends BaseEvent {
  id?: ConnectionId;
  socket: Socket;
}
export interface TimeoutServerConnectionEvent extends BaseEvent {
  id: ConnectionId;
  socket: Socket;
}

export interface NewServerConnectionEvent extends BaseEvent {
  id: ConnectionId;
  socket: Socket;
  buffer: string;
}
export interface NewClientConnectionEvent extends BaseEvent {
  id?: ConnectionId;
  buffer: string;
  socket: Socket;
}
export interface NewClientConnectionInvalid extends NewClientConnectionEvent {}

export interface HookupEvent extends BaseEvent {
  connection: Readonly<ActiveConnection>;
}
export interface NewConnectionEvent extends BaseEvent {
  socket: Socket;
}
