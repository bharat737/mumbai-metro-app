import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetroComponent } from './component/metro/metro.component';
import { TrainComponent } from './component/train/train.component';

const routes: Routes = [
  { path: 'metro', component: MetroComponent },
  { path: 'train', component: TrainComponent },
  { path: '', redirectTo: '/metro', pathMatch: 'full' }, // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
