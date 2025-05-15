import { Routes } from '@angular/router';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { AddVehiculeComponent } from './add-vehicule/add-vehicule.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
      { path: '', redirectTo: '/vehicule', pathMatch: 'full' },
      {path:'vehicule',component:VehiculeComponent},
      { path: 'vehicule/:id', component: VehiculeComponent },
      {path:'add-vehicule',component:AddVehiculeComponent},
  { path: '**', component: NotFoundComponent }];

;

