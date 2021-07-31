import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Input() isOpened = false;
  @Output() isOpenedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}
