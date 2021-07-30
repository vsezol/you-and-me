export type LogFunction = {
  (from?: string): {
    (message: string, ...args: any[]): void;
  };
};

export interface Logger {
  info: LogFunction;
  log: LogFunction;
  error: LogFunction;
}

export enum MessageTypes {
  INFO = 'info',
  LOG = 'log',
  ERROR = 'error',
}
