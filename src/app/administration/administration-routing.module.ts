import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUsersComponent } from './app-users/app-users.component';
import { RolesComponent } from './roles/roles.component';
import { ModelingComponent } from './modeling/modeling.component';
import { SqlExecutorComponent } from './sql-executor/sql-executor.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { MailServersComponent } from './mail-servers/mail-servers.component';
import { JobPreviewComponent } from './job-preview/job-preview.component';

const routes: Routes = [
  {path:'appusers',component:AppUsersComponent},
  {path:'roles',component:RolesComponent},
  {path:'modeling',component:ModelingComponent},
  {path:'sqlexecutor',component:SqlExecutorComponent},
  {path:'reports',component:ReportsComponent},
  {path:'dashboards',component:DashboardsComponent},
  {path:'mailservers',component:MailServersComponent},
  {path:'jobs',component:JobPreviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
