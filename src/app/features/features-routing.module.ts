import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GiveawayComponent } from './giveaway/giveaway.component';
import { PrintingHomeComponent } from './printing-home/printing-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },  
  { path: 'giveaway', component: GiveawayComponent },
  { path: 'printing', component: PrintingHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class FeaturesRoutingModule {}
