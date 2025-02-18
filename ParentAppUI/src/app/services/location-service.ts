import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private clientIPAddress:string='';
  private clientLatitude:string='';
  private clientLongitude:string='';
  async getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not available.'));
      }
    });
  }

  public async fetchIpAddress(): Promise<string> {
    // Logic to fetch the public IP address using an API or other method
    const response = await fetch(environment.CLIENT_IPADDRESS_SERVICE);
    const data = await response.json();
    return data.ip;
  }

  public  GetClientIPAddress():string{
    if(this.clientIPAddress && this.clientIPAddress.length>0 ){
        return this.clientIPAddress;
    }else{
        let encryptedClientIPAddress= localStorage.getItem('ipAddress');
        if(encryptedClientIPAddress && encryptedClientIPAddress.length>0){
            let decryptedString=CryptoJS.AES.decrypt(encryptedClientIPAddress,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
            return decryptedString;
        }
              
    }
    return '';
  }

  public  GetClientLatitude():string{
    if(this.clientLatitude && this.clientLatitude.length>0 ){
        return this.clientLatitude;
    }else{
        let encryptedClientLatitude= localStorage.getItem('latitude');
        if(encryptedClientLatitude && encryptedClientLatitude.length>0){
            let decryptedString=CryptoJS.AES.decrypt(encryptedClientLatitude,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
            return decryptedString;
        }
              
    }
    return '';
  }

  public  GetClientLongitude():string{
    if(this.clientLongitude && this.clientLongitude.length>0 ){
        return this.clientLongitude;
    }else{
        let encryptedClientLongitude= localStorage.getItem('longitude');
        if(encryptedClientLongitude && encryptedClientLongitude.length>0){
            let decryptedString=CryptoJS.AES.decrypt(encryptedClientLongitude,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
            return decryptedString;
        }
              
    }
    return '';
  }

  public  SetClientIPAddress(ipAddress:string){
    this.clientIPAddress=ipAddress;
    let encryptedIPAddressString=CryptoJS.AES.encrypt(ipAddress, environment.ENCRYPTION_PASSWORD).toString();
    localStorage.setItem('ipAddress',encryptedIPAddressString);
   
  }

  public  SetClientLatitude(position:any){
    this.clientLatitude=position.coords.latitude.toString();
    let encryptedLatitudeString=CryptoJS.AES.encrypt(position.coords.latitude.toString(), environment.ENCRYPTION_PASSWORD).toString();
    localStorage.setItem('latitude:', encryptedLatitudeString);
  }

  public  SetClientLongitude(position:any){
    this.clientLongitude=position.coords.longitude.toString();
    let encryptedLongitudeString=CryptoJS.AES.encrypt(position.coords.longitude.toString(), environment.ENCRYPTION_PASSWORD).toString();
    localStorage.setItem('longitude:', encryptedLongitudeString);
  }
}
