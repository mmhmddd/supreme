import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { PrintingHomeComponent } from './printing-home/printing-home.component';
import { GiveawayComponent } from './giveaway/giveaway.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [
    HomeComponent,
    PrintingHomeComponent,
    GiveawayComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    FormsModule
],
  exports:[
    HomeComponent,
    GiveawayComponent,
    PrintingHomeComponent,
    AboutComponent
  ]
})
export class FeaturesModule { }
