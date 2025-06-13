import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule
  ],
    exports: [
    NavbarComponent,
    FooterComponent,
    ContactComponent
  ]
})
export class SharedModule { }