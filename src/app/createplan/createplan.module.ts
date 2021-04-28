import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateplanPageRoutingModule } from './createplan-routing.module';

import { CreateplanPage } from './createplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateplanPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateplanPage]
})
export class CreateplanPageModule {}
