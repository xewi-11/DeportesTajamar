import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth';



export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const token = inject(AuthService).getToken();
  if (token) {
    console.log(":)))))))))))))");
  }
  const newReq = req.clone({


    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}