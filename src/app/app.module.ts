import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MetroComponent } from './component/metro/metro.component';
import { MetroService } from './services/metro.service';
import { HttpClientModule } from '@angular/common/http';
import { TrainComponent } from './component/train/train.component';
import { RegionTabsComponent } from './component/region-tabs/region-tabs.component';
import { MenuService } from './services/menu.service';
import { CityTransportSelectorComponent } from './component/city-transport-selector/city-transport-selector.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { AppSidebarComponent } from './component/app-sidebar/app-sidebar.component';
import { TransportCardComponent } from './component/transport-card/transport-card.component';

@NgModule({
  declarations: [AppComponent, MetroComponent, TrainComponent, RegionTabsComponent, CityTransportSelectorComponent, AppHeaderComponent, AppSidebarComponent, TransportCardComponent],
  imports: [BrowserModule, FormsModule,HttpClientModule],
  providers: [MetroService,MenuService],
  bootstrap: [AppComponent]
})
export class AppModule {}
