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
  socketFirstDataTimeout: number;
  keepAlive: number;
  killTimeout?: number;
}

export type ConnectionId = string;
export interface ConnectionInfo {
  id?: ConnectionId;
  address?: string;
}
export type ActiveConnectionId = string;
export type PendingConnection =
  | { server: Socket; client: null }
  | { server: null; client: Socket };

export interface ActiveConnection {
  id: ConnectionId;
  server: Socket;
  client: Socket;
}

export interface NewConnection {
  socket: Socket;
}

export interface CloseClientConnectionEvent {
  id?: ConnectionId;
  socket: Socket;
}
export interface CloseServerConnectionEvent {
  id: ConnectionId;
  socket: Socket;
}

export interface TimeoutClientConnectionEvent {
  id?: ConnectionId;
  socket: Socket;
}
export interface TimeoutServerConnectionEvent {
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
export interface NewConnectionEvent {
  socket: Socket;
}

export type SemiRequired<T, K extends keyof T> = Pick<Required<T>, K> &
  Omit<T, K>;
