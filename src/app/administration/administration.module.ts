import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AppUsersComponent } from './app-users/app-users.component';
import { CommonComponentsModule } from "../common-components/common-components.module";
import { AppUsersDialogComponent } from './app-users/app-users-dialog/app-users-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { UserRolesListDialogComponent } from './app-users/user-roles-list-dialog/user-roles-list-dialog.component';
import { RolesComponent } from './roles/roles.component';
import { RolesDialogComponent } from './roles/roles-dialog/roles-dialog.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppUsersRoleListDialogComponent } from './roles/app-users-role-list-dialog/app-users-role-list-dialog.component';
import { ModelingComponent } from './modeling/modeling.component';
import { MatTreeModule} from '@angular/material/tree';
import { ModelingDialogComponent } from './modeling/modeling-dialog/modeling-dialog.component';
import { ColumnListComponent } from './modeling/column-list/column-list.component';
import { ColumnDialogComponent } from './modeling/column-list/column-dialog/column-dialog.component';
import { TriggerListComponent } from './modeling/trigger-list/trigger-list.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TriggerDialog } from './modeling/trigger-list/trigger-dialog/trigger-dialog.component';
import { TranslatePipe } from '../pipes/translate.pipe';
import { SqlExecutorComponent } from './sql-executor/sql-executor.component';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { ListJasperReportsComponent } from './modeling/list-jasper-reports/list-jasper-reports.component';
import { JasperDialogComponent } from './modeling/list-jasper-reports/jasper-dialog/jasper-dialog.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportGroupDialogComponent } from './reports/report-group-dialog/report-group-dialog.component';
import { ChooseReportTypeDialogComponent } from './reports/choose-report-type-dialog/choose-report-type-dialog.component';
import { StandardReportComponent } from './reports/standard-report/standard-report.component';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { SortDialogComponent } from './reports/standard-report/sort-dialog/sort-dialog.component';
import { DefaultParametersDialogComponent } from './reports/standard-report/default-parameters-dialog/default-parameters-dialog.component';
import { FormsModule } from '@angular/forms';
import { ChangeNameDialogComponent } from './reports/standard-report/change-name-dialog/change-name-dialog.component';
import { GraphReportComponent } from './reports/graph-report/graph-report.component';
import { FilterGraphDialogComponent } from './reports/graph-report/filter-graph-dialog/filter-graph-dialog.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { DashboardDialogComponent } from './dashboards/dashboard-dialog/dashboard-dialog.component';
import { DashboardReportsComponent } from './dashboards/dashboard-reports/dashboard-reports.component';
import { MailServersComponent } from './mail-servers/mail-servers.component';
import { MailServerDialogComponent } from './mail-servers/mail-server-dialog/mail-server-dialog.component';
import { SendTestMailDialogComponent } from './mail-servers/send-test-mail-dialog/send-test-mail-dialog.component';
import { JobsListComponent } from './reports/jobs-list/jobs-list.component';
import { JobDialogComponent } from './reports/jobs-list/job-dialog/job-dialog.component';
import { JobPreviewComponent } from './job-preview/job-preview.component';
import { JobLogListDialogComponent } from './job-preview/job-log-list-dialog/job-log-list-dialog.component';
import { QuillModule } from 'ngx-quill';
import { ProcedureListComponent } from './modeling/procedure-list/procedure-list.component';
import { ProcedureDialogComponent } from './modeling/procedure-list/procedure-dialog/procedure-dialog.component';
import { JavaClassComponent } from './java-class/java-class.component';
import { JavaClassDialogComponent } from './java-class/java-class-dialog/java-class-dialog.component';

@NgModule({
  declarations: [
    AppUsersComponent,
    AppUsersDialogComponent,
    UserRolesListDialogComponent,
    RolesComponent,
    RolesDialogComponent,
    AppUsersRoleListDialogComponent,
    ModelingComponent,
    ModelingDialogComponent,
    ColumnListComponent,
    ColumnDialogComponent,
    TriggerListComponent,
    TriggerDialog,
    SqlExecutorComponent,
    ListJasperReportsComponent,
    JasperDialogComponent,
    ReportsComponent,
    ReportGroupDialogComponent,
    ChooseReportTypeDialogComponent,
    StandardReportComponent,
    SortDialogComponent,
    DefaultParametersDialogComponent,
    ChangeNameDialogComponent,
    GraphReportComponent,
    FilterGraphDialogComponent,
    DashboardsComponent,
    DashboardDialogComponent,
    DashboardReportsComponent,
    MailServersComponent,
    MailServerDialogComponent,
    SendTestMailDialogComponent,
    JobsListComponent,
    JobDialogComponent,
    JobPreviewComponent,
    JobLogListDialogComponent,
    ProcedureListComponent,
    ProcedureDialogComponent,
    JavaClassComponent,
    JavaClassDialogComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    CommonComponentsModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatTreeModule,
    MatTooltipModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    QuillModule.forRoot(),
],
  providers:[
    TranslatePipe
  ]
})
export class AdministrationModule { }
