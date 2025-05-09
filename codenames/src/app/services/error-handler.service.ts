import { inject, Injectable } from '@angular/core';
import { ErrorMessage, ErrorType } from '../../../model/message-interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieHandlerService } from './cookie-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private cookieHandlerService = inject(CookieHandlerService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  handle(error: ErrorMessage) {
    //TODO: other error types
    if (error.errorType == ErrorType.NoUsername) {
      console.log("No username set, redirecting to main page.");
      this.cookieHandlerService.removeCookie('playerId', '/socket.io');
      this.router.navigateByUrl('/');
    }
    else if (error.errorType == ErrorType.RoomNotFound) {
      console.log("No such room exists, redirecting to main page.");
      this.cookieHandlerService.removeCookie('playerId', '/socket.io');
      this.router.navigateByUrl('/');
      this.toastr.error('Room with the given ID does not exist.', 'Error', { toastClass: 'ngx-toastr toast-custom' }); //TODO: If it redirects the error should appear on the main page
    }
    else if (error.errorType == ErrorType.RoomNoLongerExists) {
      console.log("Room no longer exists, redirecting to main page.");
      this.cookieHandlerService.removeCookie('playerId', '/socket.io');
      this.toastr.error('The room you have selected does not exist anymore.', 'Error', { toastClass: 'ngx-toastr toast-custom' }); //TODO: If it redirects the error should appear on the main page
      this.router.navigateByUrl('/');
    }
    else {
      console.log(error.message);
      this.toastr.error(error.message, 'Error', { toastClass: 'ngx-toastr toast-custom' });
    }
  }
}
