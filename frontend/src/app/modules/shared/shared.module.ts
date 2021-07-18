import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { MatDividerModule } from '@angular/material/divider';

import { MainGridComponent } from './components/main-grid/main-grid.component';

@NgModule({
  declarations: [MainGridComponent],
  exports: [MainGridComponent],
  imports: [CommonModule, FlexLayoutModule, MatDividerModule, LayoutModule],
})
export class SharedModule {}
