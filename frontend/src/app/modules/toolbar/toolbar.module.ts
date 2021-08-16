import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarService } from './toolbar.service';
import { MaterialModule } from '@modules/material/material.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent],
  providers: [ToolbarService],
})
export class ToolbarModule {}
