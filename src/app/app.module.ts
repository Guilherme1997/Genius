import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { GeniusComponent } from './shared/components/genius/genius.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterOutlet, RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GeniusComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatRippleModule,
    CommonModule, // add here if necessasry
    RouterLinkActive,// add here if necessasry
    RouterOutlet, // add here if necessasry
    RouterLink,// add here if necessasry
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
