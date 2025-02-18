import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { from, Observable } from 'rxjs';

export const APP_TOKEN = 'app_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  FCMToken:string;
  constructor() { }

  setStorage(key: string, value: any) {
    Preferences.set({key: key, value: value});
  }

  getStorage(key: string): Promise<GetResult> {
    // Preferences.migrate();
    return Preferences.get({key: key});
  }

  removeStorage(key: string) {
    Preferences.remove({key: key});
  }

  clearStorage() {
    Preferences.clear();
  }

  getGFCMToken(): Observable<any> {
    return from(this.getStorage(APP_TOKEN));    
  }
  
}
