import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location-service';

@Injectable()
export class LocationInterceptor implements HttpInterceptor {
  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const locationService = this.injector.get(LocationService);
    // Get Public IP Address
    let publicIpAddress = locationService.GetClientIPAddress(); // You need to retrieve the public IP address here

    // Get Latitude and Longitude
    let latitude = locationService.GetClientLatitude(); // You need to retrieve the latitude here
    let longitude = locationService.GetClientLongitude(); // You need to retrieve the longitude here

    // Clone the request and add custom headers
    const modifiedRequest = request.clone({
      setHeaders: {
        'X-Public-IP': publicIpAddress,
        'X-Latitude': latitude.toString(),
        'X-Longitude': longitude.toString()
      }
    });

    return next.handle(modifiedRequest);
  }
}
