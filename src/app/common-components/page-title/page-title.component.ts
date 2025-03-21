import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SendRequestService } from '../../services/send-request.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CheckMobileService } from '../../services/check-mobile.service';
import { TableButton } from '../../model/TableButton';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent {

  @Input() title:string='';
  @Input() paths:any[]=[];
  @Input() hasAdd:boolean=true;
  @Input() addButtons:TableButton[]=[]
  @Input() hideTitle:boolean=false;

  @Output() addClicked:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output() pathClicked:EventEmitter<number>=new EventEmitter<number>();
  @Output() addButtonClicked:EventEmitter<string>=new EventEmitter<string>();

  public translate:TranslatePipe=new TranslatePipe();

  constructor(
    public sendRequest:SendRequestService,
    public checkMobile:CheckMobileService
  ){

  }

  ngOnInit(){
    
    
  }

  clickPath(pathIndex:any){
    this.pathClicked.emit(Number.parseInt(pathIndex));
  }

}
