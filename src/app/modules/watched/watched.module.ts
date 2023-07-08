import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchedRoutingModule } from './watched-routing.module';
import { WatchedComponent } from './watched.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WatchedComponent
  ],
  imports: [
    CommonModule,
    WatchedRoutingModule,
    SharedModule
  ]
})
export class WatchedModule { }
