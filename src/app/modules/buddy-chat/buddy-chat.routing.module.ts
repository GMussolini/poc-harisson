import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuddyChatComponent } from './pages/buddy-chat/buddy-chat.component';

const routes: Routes = [
  {
    path: 'chat',
    component: BuddyChatComponent
  }
];

export const BuddyChatRoutingModule = RouterModule.forChild(routes);
