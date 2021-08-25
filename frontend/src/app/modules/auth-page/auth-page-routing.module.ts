import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from '@core';
import { AuthPageComponent } from './auth-page/auth-page.component';

export enum AuthTypeNames {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: ':authType', component: AuthPageComponent },
      {
        path: '',
        redirectTo: `/auth/${AuthTypeNames.SIGN_IN}`,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
