import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrl: './no-page-found.component.css'
})
export class NoPageFoundComponent {

  public translate:TranslatePipe=new TranslatePipe();

}
