import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@modules';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarService } from './toolbar.service';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent],
  providers: [ToolbarService],
})
export class ToolbarModule {}
