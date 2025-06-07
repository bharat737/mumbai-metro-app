import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MetroComponent } from './component/metro/metro.component';
import { MetroService } from './services/metro.service';
import { HttpClientModule } from '@angular/common/http';
import { TrainComponent } from './component/train/train.component';
import { MenuService } from './services/menu.service';
import { CityTransportSelectorComponent } from './component/city-transport-selector/city-transport-selector.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { AppSidebarComponent } from './component/app-sidebar/app-sidebar.component';
import { TransportCardComponent } from './component/transport-card/transport-card.component';
import { StationInputComponent } from './component/station-input/station-input.component';
import { TransportTabBarComponent } from './component/transport-tab-bar/transport-tab-bar.component';
import { ByStationComponent } from './component/ByStaion/by-station/by-station.component';
import { FooterComponent } from './component/footer/footer.component';
import { MetroLineDetailComponent } from './component/lineDetails/metro-line-detail/metro-line-detail.component';
import { MetroStationDetailComponent } from './component/station-details/metro-station-detail/metro-station-detail.component';
import { BreadcrumbComponent } from './component/shared/breadcrumb/breadcrumb.component';
import { MetroStationSearchRouteResultComponent } from './component/shared/metro-station-search-route-result/metro-station-search-route-result.component';

@NgModule({
  declarations: [AppComponent, MetroComponent, TrainComponent, CityTransportSelectorComponent, AppHeaderComponent, AppSidebarComponent, TransportCardComponent, StationInputComponent, TransportTabBarComponent, ByStationComponent, FooterComponent, MetroLineDetailComponent, MetroStationDetailComponent, BreadcrumbComponent, MetroStationSearchRouteResultComponent],
  imports: [BrowserModule, FormsModule,HttpClientModule],
  providers: [MetroService,MenuService],
  bootstrap: [AppComponent]
})
export class AppModule {}
