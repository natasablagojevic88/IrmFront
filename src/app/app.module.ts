import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { CommonPagesModule } from './common-pages/common-pages.module';
import { CommonComponentsModule } from './common-components/common-components.module';
import { TranslatePipe } from './pipes/translate.pipe';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatMenuModule} from '@angular/material/menu';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localesrLatn from '@angular/common/locales/sr-Latn';
registerLocaleData(localesrLatn);
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { environment } from '../environments/environment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import { QuillModule } from 'ngx-quill';

export const DATE_FORMATS = {
  parse: {
    dateInput:  environment.dateInputFormat,
  },
  display: {
    dateInput: environment.dateInputFormat,
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonPagesModule,
    CommonComponentsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatBadgeModule,
    QuillModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    DecimalPipe,
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: LOCALE_ID, useValue: 'sr-Latn' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
