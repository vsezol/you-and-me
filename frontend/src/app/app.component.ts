import { Component } from '@angular/core';
import { DynamicStyleLoadingService } from './services/dynamic-style-loading.service';

enum ThemeBundleNames {
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isDarkMode = true;

  get themeBundleName() {
    return this.isDarkMode ? ThemeBundleNames.DARK : ThemeBundleNames.LIGHT;
  }

  constructor(private dynamicStyleLoadingService: DynamicStyleLoadingService) {}

  ngOnInit(): void {
    this.setThemeModeToDocument();
  }

  onToggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.setThemeModeToDocument();
  }

  setThemeModeToDocument(): void {
    this.dynamicStyleLoadingService.loadStyle(
      this.themeBundleName,
      'dynamic-theme-style'
    );
  }
}
