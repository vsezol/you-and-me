import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { ThemeSwitcherComponent } from './core/components/theme-switcher/theme-switcher.component';
import { MaterialModule } from './modules/material/material.module';
import { PeerModule } from './modules/peer/peer.module';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, ThemeSwitcherComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PeerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
