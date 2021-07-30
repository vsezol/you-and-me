import { Injectable } from '@angular/core';
import { LogFunction, Logger } from './types';

@Injectable()
export class LoggerService implements Logger {
  info!: LogFunction;
  log!: LogFunction;
  error!: LogFunction;

  constructor() {}
}
