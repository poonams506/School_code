import { Injectable, OnDestroy } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { CabDriverAppServiceProxy, CabDriverLocationDto, ICabDriverLocationDto } from './school-api-service';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';
import { Capacitor } from '@capacitor/core';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GPSLocationService  {
  private tripId:number;

  constructor(private cabDriverAppServiceService: CabDriverAppServiceProxy,
    private locationAccuracy: LocationAccuracy,
    private storageService:StorageService
  ) { }
  async testCurrentLocation() {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      console.log('Permission status: ', permissionStatus.location);
      if(permissionStatus?.location != 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if(requestStatus.location != 'granted') {
          // go to location settings
          await this.openSettings(true);
          return;
        }
      }

      if(Capacitor.getPlatform() == 'android') {
        this.enableGps();
      }

      let options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true
      };
      const position = await Geolocation.getCurrentPosition(options);
      console.log(position);
    
    } catch(e: any) {
      if(e?.message == 'Location services are not enabled') {
        await this.openSettings();
      }
      console.log(e);
    }
  }
  async getCurrentLocation() {
    try {
     
      let options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true
      };
      const position = await Geolocation.getCurrentPosition(options);
      console.log(position);
      const tripLocation = {tripId:this.tripId,lat:position.coords.latitude,long:position.coords.longitude} as ICabDriverLocationDto
      console.log('Location sending to backend Started');
     this.cabDriverAppServiceService.updateCabDriverLocationByTrip(new CabDriverLocationDto(tripLocation)).subscribe(result=>{
      console.log('Location sending to backend Completed');
     });
    } catch(e: any) {
      console.log(e);
    }
  }

  openSettings(app = false) {
    console.log('open settings...');
    return NativeSettings.open({
      optionAndroid: app ? AndroidSettings.ApplicationDetails : AndroidSettings.Location, 
      optionIOS: app ? IOSSettings.App : IOSSettings.LocationServices
    });
  }

  async enableGps() {
    const canRequest = await this.locationAccuracy.canRequest();
    if(canRequest) {
      await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }
  }

 

}
