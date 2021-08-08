import { Component, EventEmitter, Output } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor(public toolbarService: ToolbarService) {}
}
