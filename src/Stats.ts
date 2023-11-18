export class Stats {
  startedAt!: null | Date;
  stoppedAt!: null | Date;
  connections!: {
    total: number;
    client: number;
    direct: number;
    server: number;
    established: number;
  };

  constructor() {
    this.reset();
  }

  serialize() {
    return {
      startedAt: this.startedAt ? new Date(this.startedAt) : null,
      stoppedAt: this.stoppedAt ? new Date(this.stoppedAt) : null,
      connections: {
        ...this.connections,
      },
    };
  }

  reset() {
    this.startedAt = null;
    this.stoppedAt = null;
    this.connections = {
      total: 0,
      client: 0,
      direct: 0,
      server: 0,
      established: 0,
    };
  }

  start() {
    this.reset();
    this.startedAt = new Date();
  }

  stop() {
    this.stoppedAt = new Date();
  }

  logServer() {
    this.connections.total++;
    this.connections.server++;
  }

  logClient() {
    this.connections.total++;
    this.connections.client++;
  }

  logDirect() {
    this.connections.total++;
    this.connections.direct++;
  }

  logEstablished() {
    this.connections.established++;
  }
}
