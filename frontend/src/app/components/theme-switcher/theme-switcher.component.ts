import { Output, EventEmitter, Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  @Input() isDark: boolean = false;

  @Output() toggle = new EventEmitter<boolean>();

  onToggleTheme(): void {
    this.toggle.emit(!this.isDark);
  }
}
