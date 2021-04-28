import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateplanPage } from './createplan.page';

const routes: Routes = [
  {
    path: '',
    component: CreateplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateplanPageRoutingModule {}
