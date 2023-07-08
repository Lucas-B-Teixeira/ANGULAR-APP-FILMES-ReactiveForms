import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'community', 
    loadChildren: () => import('./modules/community/community.module').then(m => m.CommunityModule) 
  }, 
  { 
    path: 'favorites', 
    loadChildren: () => import('./modules/favorites/favorites.module').then(m => m.FavoritesModule) 
  }, 
  { 
    path: 'watched', 
    loadChildren: () => import('./modules/watched/watched.module').then(m => m.WatchedModule) 
  },  
  { 
    path: 'addfilme', 
    loadChildren: () => import('./modules/addfilme/addfilme.module').then(m => m.AddfilmeModule) 
  },
  {
    path: '',
    redirectTo: 'community',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    loadChildren: () => import('./modules/pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
