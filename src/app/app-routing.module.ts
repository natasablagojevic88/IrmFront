import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common-pages/login/login.component';
import { HomePageComponent } from './common-pages/home-page/home-page.component';
import { NoPageFoundComponent } from './common-pages/no-page-found/no-page-found.component';
import { NoRightComponent } from './common-pages/no-right/no-right.component';
import { NotificationComponent } from './common-pages/notification/notification.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'noright',component:NoRightComponent},
  {path:'administration',loadChildren:()=>import('./administration/administration.module').then(m=>m.AdministrationModule)},
  {path:'preview',loadChildren:()=>import('./preview/preview.module').then(m=>m.PreviewModule)},
  {path:'notification',component:NotificationComponent},
  {path:'**',component:NoPageFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
