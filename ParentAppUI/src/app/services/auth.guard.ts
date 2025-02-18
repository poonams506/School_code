import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn} from '@angular/router';
import { UserService } from './user-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';
export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const userService = inject(UserService);
  const router = inject(Router);
    if(userService.isAuthenticated())
    {
      userService.getUser().subscribe(result=>{
        let roleId= localStorage.getItem("id");
        if(roleId && roleId!=''){
          let decryptedString=CryptoJS.AES.decrypt(roleId!, environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
           if(decryptedString=="3"){
            router.navigate(['/teacher-app']);
          }
          else if(decryptedString=="5")
          {
            router.navigate(['/parent-app']);
          }
          else if(decryptedString=="6")
          {
            router.navigate(['/driver-app']);
          }
          
        }
        else
        {
          return true;
        }

      });
    
    }
    else
    {
     
      return true;
    }

   


}