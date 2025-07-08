import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GiveawayComponent } from './giveaway/giveaway.component';
import { PrintingHomeComponent } from './printing-home/printing-home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },  
  { path: 'giveaway', component: GiveawayComponent },
  { path: 'printing', component: PrintingHomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class FeaturesRoutingModule {}
