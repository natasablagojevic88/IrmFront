import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadCookieService {

  constructor() { }

  getCookie(cookie:string):any{
    let cookies = document.cookie.split(';'); 
    let cookieObject:any = {};

    cookies.forEach(cookie => {
        let [key, value] = cookie.split('=');
        if (key && value) {
            cookieObject[key.trim()] = decodeURIComponent(value.trim()); 
        }
    });


    return cookieObject[cookie];
  }
}
