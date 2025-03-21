import { Component } from '@angular/core';
import { DashboardDefaultData } from '../../model/DashboardDefaultData';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  interval:any;
  dashData:any|undefined=undefined;


  ngOnInit(){
    if(DashboardDefaultData.dashbordInfo==undefined){
      this.createTimer();
    }else{
      this.dashData=DashboardDefaultData.dashbordInfo;
    }
   
    
  }

  createTimer(){
    this.interval = setInterval(()=>{
      this.dashData=DashboardDefaultData.dashbordInfo;
      if(DashboardDefaultData.dashbordInfo!=undefined){
        clearInterval(this.interval);
      }
      if(!DashboardDefaultData.hasDefault){
        clearInterval(this.interval);
      }
    },500);
  }
}
