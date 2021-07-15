import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { VideoComponent } from './components/video/video.component';
import { ChatPageComponent } from './views/chat-page/chat-page.component';

@NgModule({
  declarations: [VideoComponent, ChatPageComponent],
  imports: [CommonModule, FormsModule, ChatRoutingModule],
  exports: [ChatRoutingModule],
})
export class ChatModule {}
