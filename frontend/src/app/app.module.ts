import { InjectionToken, NgModule, Provider } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from '@modules/users';
import { ToolbarModule } from '@modules/toolbar';
import { AuthModule } from '@modules/auth';
import { PeerModule } from '@modules/peer';
import {
  MainLayoutComponent,
  ThemeSwitcherComponent,
  SideNavComponent,
  HAMMER_CONFIG_PROVIDER,
} from '@core';
import { MaterialModule } from '@modules/material';
import { SocketModule } from '@modules/socket';
import { environment } from '@environments';


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
    SocketModule.forRoot(environment.wsUrl),
  ],
  providers: [HAMMER_CONFIG_PROVIDER, APP_NAME_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
