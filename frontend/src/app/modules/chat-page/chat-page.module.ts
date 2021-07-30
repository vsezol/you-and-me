import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { VideoComponent } from './video/video.component';
import { ChatPageRoutingModule } from './chat-page-routing.module';
import { GridComponent } from './grid/grid.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ChatPageComponent, VideoComponent, GridComponent],
  imports: [
    CommonModule,
    ChatPageRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class ChatPageModule {}
