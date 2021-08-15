import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { ToolbarService } from '../toolbar.service';
import { APP_NAME } from '@app/app.module';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public toolbarService: ToolbarService,
    @Inject(APP_NAME) public appName: string
  ) {}
}
