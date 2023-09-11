import { Socket } from "node:net";
import type { Logger, LogLevel } from "./logger.js";

export interface VNCRepeaterOptions {
  clientPort: number;
  serverPort: number;
  bufferSize: number;
  refuse?: boolean;
  noRFB?: boolean;
  logFile?: string;
  debug?: boolean;
  logger?: Logger;
  logLevel?: LogLevel;
  socketTimeout?: number;
  killTimeout?: number;
}

export type ConnectionId = string;
export type ActiveConnectionId = string;
export type PendingConnection =
  | { server: Socket; client: null }
  | { server: null; client: Socket };

export type ActiveConnection = {
  id: ConnectionId;
  server: Socket;
  client: Socket;
};

export interface CloseConnectionEvent {
  id: ConnectionId;
  socket: Socket;
}

export interface NewServerConnectionEvent {
  id: ConnectionId;
  socket: Socket;
  buffer: string;
}
export interface NewClientConnectionEvent {
  id?: ConnectionId;
  buffer: string;
  socket: Socket;
}
