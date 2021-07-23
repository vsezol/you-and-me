import { DOCUMENT } from '@angular/common';
import { Inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';

enum ThemeBundleNames {
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isDarkMode = false;

  get themeBundleName() {
    return this.isDarkMode ? ThemeBundleNames.DARK : ThemeBundleNames.LIGHT;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.setThemeModeToDocument();
  }

  onToggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.setThemeModeToDocument();
  }

  setThemeModeToDocument(): void {
    this.loadStyle(this.themeBundleName, 'dynamic-theme-style');
  }

  private loadStyle(styleBundleName: string, elementId = 'dynamic-style') {
    const styleBundlePath = `${styleBundleName}.css`;

    let themeLinkElement = this.document.getElementById(
      elementId
    ) as HTMLLinkElement;

    if (!themeLinkElement) {
      themeLinkElement = this.createLinkStyleElement(elementId);
      this.appendElementToHead(themeLinkElement);
    }

    themeLinkElement.href = styleBundlePath;
  }

  private createLinkStyleElement(elementId: string) {
    const linkElement = this.document.createElement('link');
    linkElement.id = elementId;
    linkElement.rel = 'stylesheet';

    return linkElement;
  }

  private appendElementToHead(element: HTMLElement) {
    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(element);
  }
}
