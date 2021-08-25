import { NgModule } from '@angular/core';
import { LoggerService } from './logger.service';

import { ConsoleLoggerService } from './console-logger.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    {
      provide: LoggerService,
      useClass: ConsoleLoggerService,
    },
  ],
})
export class LoggerModule {}
