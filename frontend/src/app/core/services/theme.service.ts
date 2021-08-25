import { Injectable } from '@angular/core';
import { DynamicStyleLoadingService } from './dynamic-style-loading.service';

enum ThemeBundleNames {
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _isDarkMode = true;

  public get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  constructor(private dynamicStyleLoadingService: DynamicStyleLoadingService) {}

  public toggleTheme(): void {
    this._isDarkMode = !this._isDarkMode;
    this.setThemeModeToDocument();
  }

  public initTheme(): void {
    this.setThemeModeToDocument();
  }

  private setThemeModeToDocument(): void {
    this.dynamicStyleLoadingService.loadStyle(
      this.themeBundleName,
      'dynamic-theme-style'
    );
  }

  private get themeBundleName(): ThemeBundleNames {
    return this.isDarkMode ? ThemeBundleNames.DARK : ThemeBundleNames.LIGHT;
  }
}
