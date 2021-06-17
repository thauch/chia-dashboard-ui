import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showSuccessToast(msg, title = '', options = {}) {
    options = Object.assign({
      timeOut: 1000,
      progressBar: true,
      tapToDismiss: true,
    }, options);
    this.toastr.success(msg, title, options);
  }

  showInfoToast(msg, title = '', options = {}) {
    options = Object.assign({
      timeOut: 2000,
      progressBar: true,
      tapToDismiss: true,
    }, options);
    this.toastr.info(msg, title, options);
  }

  showErrorToast(msg, title = '', options = {}) {
    options = Object.assign({
      timeOut: 2000,
      progressBar: true,
      tapToDismiss: false,
    }, options);
    this.toastr.error(msg, title, options);
  }

  showWarningConfirmToast(msg, title = '', options = {}) {
    options = Object.assign({
      disableTimeOut: true,
      tapToDismiss: true,
      closeButton: true,
    }, options);
    this.toastr.warning(msg, title, options);
  }
}
