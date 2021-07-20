import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { MatDividerModule } from '@angular/material/divider';

import { MainGridComponent } from './components/main-grid/main-grid.component';
import { LogoComponent } from './components/logo/logo.component';
import { PeerModule } from '../peer/peer.module';

@NgModule({
  declarations: [MainGridComponent, LogoComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
    LayoutModule,
    PeerModule,
  ],
  exports: [MainGridComponent, LogoComponent, PeerModule],
})
export class SharedModule {}
