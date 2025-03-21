import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckMobileService {

    isMobile():boolean{
      if(sessionStorage.getItem("mobile")==null){
        return false;

      }

      if(sessionStorage.getItem("mobile")=="Y"){
        return true;
      }else{
        return false;
      }
    }

}
