import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuddyChatComponent } from './modules/buddy-chat/pages/buddy-chat/buddy-chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuddyTalkApiService } from './core/http/buddy-talk-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [BuddyTalkApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
