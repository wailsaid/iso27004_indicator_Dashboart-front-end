import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}






import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from the authentication service
    const token = this.authService.getAuthToken();

    // Check if the request URL starts with '/api/v1/' and does not contain the Authorization header
    if (request.url.startsWith('http://localhost:8080/api/v1/') && !request.headers.has('Authorization')) {
      // Clone the request and add the Authorization header with the token
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Pass the modified request to the next interceptor or the HTTP handler
      return next.handle(authRequest);
    }

    // For other requests or requests that already have the Authorization header, simply pass them along
    return next.handle(request);
  }
}


import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router : Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Unauthorized or Forbidden error, log out the user
          this.authService.logout();
          this.router.navigate(['login']);
        }
        // Re-throw other errors
        return throwError(error);
      })
    );
  }
}
