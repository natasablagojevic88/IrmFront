import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewModelComponent } from './preview-model/preview-model.component';
import { PreviewReportComponent } from './preview-report/preview-report.component';
import { PreviewDashboardComponent } from './preview-dashboard/preview-dashboard.component';

const routes: Routes = [
  {path:'previewmodel',component:PreviewModelComponent},
  {path:'previewreport',component:PreviewReportComponent},
  {path:'previewdashboard',component:PreviewDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewRoutingModule { }
