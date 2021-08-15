import { InjectionToken, NgModule, Provider } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  UsersModule,
  ToolbarModule,
  PeerModule,
  AuthModule,
  MaterialModule,
} from '@modules';
import {
  MainLayoutComponent,
  ThemeSwitcherComponent,
  SideNavComponent,
  HAMMER_CONFIG_PROVIDER,
} from '@core';

export const APP_NAME = new InjectionToken<string>('AppName');
const APP_NAME_PROVIDER: Provider = {
  provide: APP_NAME,
  useValue: 'You&Me',
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ThemeSwitcherComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PeerModule,
    AuthModule,
    UsersModule,
    HammerModule,
    FlexLayoutModule,
    ToolbarModule,
  ],
  providers: [HAMMER_CONFIG_PROVIDER, APP_NAME_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
