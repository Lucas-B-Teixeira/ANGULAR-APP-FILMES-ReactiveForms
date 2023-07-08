import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddfilmeRoutingModule } from './addfilme-routing.module';
import { AddfilmeComponent } from './addfilme.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddfilmeComponent
  ],
  imports: [
    CommonModule,
    AddfilmeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddfilmeModule { }
