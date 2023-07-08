import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddfilmeComponent } from './addfilme.component';

const routes: Routes = [{ path: '', component: AddfilmeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddfilmeRoutingModule { }
