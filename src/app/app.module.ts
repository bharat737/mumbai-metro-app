import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MetroComponent } from './metro/metro.component';
import { MetroService } from './metro/metro.service';

@NgModule({
  declarations: [AppComponent, MetroComponent],
  imports: [BrowserModule, FormsModule],
  providers: [MetroService],
  bootstrap: [AppComponent]
})
export class AppModule {}
