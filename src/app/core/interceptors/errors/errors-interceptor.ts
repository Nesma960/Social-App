import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService)

  return next(req).pipe(catchError((err: HttpErrorResponse) => {

    // logic
    // display toast notification

    toastrService.error(err.error.message, "Socia App", {
      closeButton: true,
      timeOut: 3000,
    })

    return throwError(() => err)
  }))
};
