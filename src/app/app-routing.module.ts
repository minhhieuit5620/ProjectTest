// import { MainComponent } from './main/main.component';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './user/layout-user/home/home.component';
import{ UserComponent} from './user/user.component';

// import { FileNotFoundComponent } from './shared/file-not-found/file-not-found.component';
// import { AuthGuard } from './lib/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/layout/layout.module').then((m) => m.LayoutModule)    
   },
   
   {
    path: '',
    loadChildren: () => import('./user/layout-user/layout-user.module').then((m) => m.Layout_UserModule)
    
   },
   {
    path: 'user',
    loadChildren: () => import('./user/layout-user/layout-user.module').then((m) => m.Layout_UserModule)
    
   },
 
  {
    path: 'login',
    component: LoginComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule {}
