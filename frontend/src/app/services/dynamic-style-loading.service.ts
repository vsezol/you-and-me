import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DynamicStyleLoadingService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public loadStyle(styleBundleName: string, elementId = 'dynamic-style') {
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
