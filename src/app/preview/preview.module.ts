import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewModelComponent } from './preview-model/preview-model.component';
import { CommonComponentsModule } from "../common-components/common-components.module";
import { CreateDataDialogComponent } from './preview-model/create-data-dialog/create-data-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { UploadTemplateDialogComponent } from './preview-model/upload-template-dialog/upload-template-dialog.component';
import { PreviewReportComponent } from './preview-report/preview-report.component'; 
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PreviewReportTableComponent } from './preview-report/preview-report-table/preview-report-table.component';
import { PreviewReportGraphComponent } from './preview-report/preview-report-graph/preview-report-graph.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { PreviewReportKpiComponent } from './preview-report/preview-report-kpi/preview-report-kpi.component';
import { PreviewReportJasperComponent } from './preview-report/preview-report-jasper/preview-report-jasper.component';
import { PdfJsViewerModule } from "ng2-pdfjs-viewer";
import { PreviewDashboardComponent } from './preview-dashboard/preview-dashboard.component';

@NgModule({
  declarations: [
    PreviewModelComponent,
    CreateDataDialogComponent,
    UploadTemplateDialogComponent,
    PreviewReportComponent,
    PreviewReportTableComponent,
    PreviewReportGraphComponent,
    PreviewReportKpiComponent,
    PreviewReportJasperComponent,
    PreviewDashboardComponent
  ],
  imports: [
    CommonModule,
    PreviewRoutingModule,
    CommonComponentsModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    CanvasJSAngularChartsModule,
    PdfJsViewerModule
],
exports:[
  PreviewDashboardComponent
]
})
export class PreviewModule { }
