import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerDashBoard } from './owner-dash-board/owner-dash-board';
import { OwnerInformation } from './owner-information/owner-information';

const routes: Routes = [
  { path: 'owner-dashboard', component: OwnerDashBoard },
  { path: 'owner-information' , component: OwnerInformation },
  { path: '', redirectTo: 'owner-dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
