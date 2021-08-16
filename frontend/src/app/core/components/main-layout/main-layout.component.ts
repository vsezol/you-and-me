import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  public isShowSideNav = false;

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  public toggleSideNav(): void {
    this.isShowSideNav = !this.isShowSideNav;
  }

  public openSideNav(): void {
    this.isShowSideNav = true;
  }

  public closeSideNav(): void {
    this.isShowSideNav = false;
  }
}
