import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-no-right',
  templateUrl: './no-right.component.html',
  styleUrl: './no-right.component.css'
})
export class NoRightComponent {

  translate:TranslatePipe=new TranslatePipe();

}
