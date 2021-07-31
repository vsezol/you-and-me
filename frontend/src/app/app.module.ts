import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { ThemeSwitcherComponent } from './core/components/theme-switcher/theme-switcher.component';
import { MaterialModule } from './modules/material/material.module';
import { PeerModule } from './modules/peer/peer.module';
import { AuthModule } from './modules/auth/auth.module';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { UsersModule } from './modules/users/users.module';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, ThemeSwitcherComponent, SideNavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PeerModule,
    AuthModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
