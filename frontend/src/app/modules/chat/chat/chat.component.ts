import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/core/services/toolbar.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(private toolbarService: ToolbarService) {}

  ngOnInit(): void {
    this.toolbarService.setActions([
      {
        icon: 'videocam',
        name: 'videoCall',
      },
      {
        icon: 'call',
        name: 'voiceCall',
      },
    ]);
  }

  ngOnDestroy(): void {
    this.toolbarService.clearActions();
  }
}
