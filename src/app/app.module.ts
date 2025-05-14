import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MetroComponent } from './metro/metro.component';
import { MetroService } from './metro/metro.service';
import { HttpClientModule } from '@angular/common/http';
import { TrainComponent } from './train/train.component';
import { AppRoutingModule } from './app-routing.module';
import { RegionTabsComponent } from './shared/region-tabs/region-tabs.component';
import { MenuService } from './shared/menu.service';

@NgModule({
  declarations: [AppComponent, MetroComponent, TrainComponent, RegionTabsComponent],
  imports: [BrowserModule, FormsModule,HttpClientModule,AppRoutingModule],
  providers: [MetroService,MenuService],
  bootstrap: [AppComponent]
})
export class AppModule {}
