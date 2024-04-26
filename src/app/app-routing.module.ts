import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'buddy-chat',
    loadChildren: () => import('./modules/buddy-chat/buddy-chat.module').then(n => n.BuddyChatPageModule)
  },
  {
    path: '',
    redirectTo: 'buddy-chat',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
