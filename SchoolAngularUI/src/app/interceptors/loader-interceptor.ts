import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader-service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor {
  constructor(private router: Router, private injector: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loaderService = this.injector.get(LoaderService);
   

    loaderService.addAPI();
    //console.log(`Added ${req.url} with ${req.body} body`)

    return next.handle(req).pipe(
      // timeout(15000),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          loaderService.removeAPI();
          //console.log(`Removed ${req.url} after response ${event.status} with ${event.body}`);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        let data = {};
        data = {
          reason: error && error.error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        loaderService.removeAPI();
        //console.log(`Removed: ${req.url} after error response ${error.status} with ${error.error}`);
        return throwError(error);
      }));

  }


}