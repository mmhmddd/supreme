import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesRoutingModule } from './features/features-routing.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 75] 
    }),
    FeaturesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}