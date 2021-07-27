import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { ChatModule } from './modules/chat/chat.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { ThemeSwitcherComponent } from './core/components/theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, ThemeSwitcherComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChatModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
