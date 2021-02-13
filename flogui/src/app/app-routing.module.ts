import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client-spacing/client-spacing.module')
      .then(mod => mod.ClientSpacingModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./client-spacing/client-spacing.module')
      .then(mod => mod.ClientSpacingModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module')
      .then(mod => mod.EditorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
