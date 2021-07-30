import { Injectable } from '@angular/core';
import { Logger, MessageTypes } from './types';

interface PrintProps {
  type: MessageTypes;
  message: string;
  from?: string;
  args: any[];
}

const styles = {
  [MessageTypes.INFO]: `
    background: dodgerblue;
    padding: 2px;
  `,
  [MessageTypes.LOG]: `
    background: mediumaquamarine;
    padding: 2px;
  `,
  [MessageTypes.ERROR]: `
    background: crimson;
    padding: 2px;
  `,
};

@Injectable()
export class ConsoleLoggerService implements Logger {
  constructor() {}

  info(from?: string) {
    return (message: string, ...args: any[]) => {
      this.print({ type: MessageTypes.INFO, message, from, args });
    };
  }

  log(from?: string) {
    return (message: string, ...args: any[]) => {
      this.print({ type: MessageTypes.INFO, message, from, args });
    };
  }

  error(from?: string) {
    return (message: string, ...args: any[]) => {
      this.print({ type: MessageTypes.INFO, message, from, args });
    };
  }

  private print({ type, message, from = '', args }: PrintProps): void {
    console.log(
      `%c${type.toUpperCase()}`,
      styles[type],
      `${from.length > 0 ? `[${from}]` : ''} ${message}`,
      ...args
    );
  }
}
