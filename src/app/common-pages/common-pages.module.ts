import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { CommonComponentsModule } from '../common-components/common-components.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NoRightComponent } from './no-right/no-right.component';
import { PreviewModule } from '../preview/preview.module';
import { NotificationComponent } from './notification/notification.component';
import { NotificationDialogComponent } from './notification/notification-dialog/notification-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    NoPageFoundComponent,
    HomePageComponent,
    NoRightComponent,
    NotificationComponent,
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonComponentsModule,
    PreviewModule
  ]
})
export class CommonPagesModule { }
