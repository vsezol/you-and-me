import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

enum ThemeClassNames {
  LIGHT = 'theme_light',
  DARK = 'theme_dark',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isDarkMode = false;

  get themeMode() {
    return this.isDarkMode ? ThemeClassNames.DARK : ThemeClassNames.LIGHT;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setThemeModeToDocument();
  }

  onToggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.setThemeModeToDocument();
  }

  setThemeModeToDocument(): void {
    this.renderer.setAttribute(this.document.body, 'class', this.themeMode);
  }
}
