import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle generic HTTP errors with browser alerts
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          alert('Not found');
        } else {
          alert('Something went wrong');
        }
      } else {
        alert('Something went wrong');
      }
      
      return throwError(() => error);
    })
  );
};
