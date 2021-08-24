import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarService } from './toolbar.service';
import { MaterialModule } from '@modules/material';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent],
  providers: [ToolbarService],
})
export class ToolbarModule {}
