import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainGridComponent } from './components/main-grid/main-grid.component';

@NgModule({
  declarations: [MainGridComponent],
  exports: [MainGridComponent],
  imports: [CommonModule],
})
export class SharedModule {}
