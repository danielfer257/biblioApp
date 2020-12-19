import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
 
  {
    path: 'info-bibliografy/:id',
    loadChildren: () => import('./page/info-bibliografy/info-bibliografy.module').then( m => m.InfoBibliografyPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-bibliografy',
    loadChildren: () => import('./page/add-bibliografy/add-bibliografy.module').then( m => m.AddBibliografyPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
