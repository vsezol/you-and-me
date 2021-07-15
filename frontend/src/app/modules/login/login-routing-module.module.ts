import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/components/main-layout/main-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: LoginPageComponent }],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
