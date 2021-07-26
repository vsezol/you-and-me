import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';

const routes: Routes = [
  {
    path: 'chat',
    loadChildren: () =>
      import('./modules/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth-page/auth-page.module').then(
        (m) => m.AuthPageModule
      ),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./modules/contacts-page/contacts-page.module').then(
        (m) => m.ContactsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
