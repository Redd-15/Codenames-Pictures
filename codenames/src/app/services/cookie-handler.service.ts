import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieHandlerService {

  /** Set a cookie with given name, value and path */
  setCookie(name: string, value: string, path: string){
    console.log('SetCookie', name, value, path);
    document.cookie = `${name}=${value}; path=${path}; SameSite=Strict;  max-age=14400;`;
  }

  /** Set a cookie of given name and path. The path should be same as on setting! */
  removeCookie(name: string, path:string) {
    console.log('RemoveCookie', name, path);
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  }
}
