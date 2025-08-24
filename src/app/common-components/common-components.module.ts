import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import {MatSelectModule} from '@angular/material/select';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { PageTitleComponent } from './page-title/page-title.component';
import { TableComponent } from './table/table.component'
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { FilterTableComponent } from './table/filter-table/filter-table.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { GridTileComponent } from './grid-tile/grid-tile.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DATE_FORMATS } from '../app.module';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CheckBoxComponent } from './check-box/check-box.component';
import {MatMenuModule} from '@angular/material/menu';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { HistoryComponent } from './history/history.component'; 
import {PlatformModule} from '@angular/cdk/platform'; 
import { HttpClientModule } from '@angular/common/http';
import { FindDialogComponent } from './select/find-dialog/find-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import { TextAreaComponent } from './text-area/text-area.component';
import { ChangePassowrdDialogComponent } from './change-passowrd-dialog/change-passowrd-dialog.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AutoCompleteInputComponent } from './auto-complete-input/auto-complete-input.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    MainMenuComponent,
    ProgressSpinnerComponent,
    PageTitleComponent,
    TableComponent,
    FilterTableComponent,
    DialogHeaderComponent,
    GridTileComponent,
    DatePickerComponent,
    CheckBoxComponent,
    YesNoDialogComponent,
    HistoryComponent,
    FindDialogComponent,
    TextAreaComponent,
    ChangePassowrdDialogComponent,
    UserDetailComponent,
    AutoCompleteInputComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatTreeModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatMenuModule,
    PlatformModule,
    HttpClientModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  exports:[
    InputComponent,
    SelectComponent,
    MainMenuComponent,
    ProgressSpinnerComponent,
    PageTitleComponent,
    TableComponent,
    DialogHeaderComponent,
    GridTileComponent,
    DatePickerComponent,
    CheckBoxComponent,
    YesNoDialogComponent,
    TextAreaComponent,
    ChangePassowrdDialogComponent,
    AutoCompleteInputComponent
  ],
  providers:[
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
  ]
})
export class CommonComponentsModule { }
