import { Component, Input, EventEmitter, Output } from '@angular/core';

type Colors = 'primary' | 'accent' | 'warn';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() message!: string;
  @Input() color: Colors = 'primary';

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}
