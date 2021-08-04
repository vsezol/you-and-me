import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { VideoComponent } from './video/video.component';
import { GridComponent } from './grid/grid.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ChatComponent, VideoComponent, GridComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [ChatComponent, VideoComponent, GridComponent],
})
export class ChatModule {}
