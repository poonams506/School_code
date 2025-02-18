import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js/';  
import { UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedPermissionServiceService {
  menuPermission : UserRoleModulePermissionDto ;
  constructor() { }

  havePermission(moduleName : string, permissionName : string){
    let hasAccess = false;
    if(this.menuPermission){
      this.menuPermission.roleDetails?.forEach(allowedModulesElement => {
        allowedModulesElement.allowedModules?.forEach(moduleElement => {
          if(moduleElement.childModules?.length == 0){ // parent menu
            if(moduleElement.moduleName == moduleName){
              moduleElement.allowedPermissions?.forEach(permissionElement => {
                if(permissionElement && permissionElement.permissionName == permissionName){
                  hasAccess = true;
                }
              });   
            }
          }
          else if(moduleElement.childModules != undefined && moduleElement.childModules.length > 0){  // child menu
            moduleElement.childModules.forEach(childModulesElement => {
              if(childModulesElement.moduleName == moduleName){
                childModulesElement.allowedPermissions?.forEach(permissionElement => {
                  if(permissionElement && permissionElement.permissionName == permissionName){
                    hasAccess = true;
                  }
                });   
              }
            });
           
          }
        });
      });
    }
    else{
      let permission = localStorage.getItem("permissions")!;
    let decryptedString=CryptoJS.AES.decrypt(permission,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
    let result = new UserRoleModulePermissionDto ;
    if(decryptedString != null && decryptedString != "" && decryptedString != undefined){
      result = JSON.parse(decryptedString) as UserRoleModulePermissionDto ;
      this.menuPermission = result;
      result.roleDetails?.forEach(allowedModulesElement => {
        allowedModulesElement.allowedModules?.forEach(moduleElement => {
          if(moduleElement.childModules?.length == 0){ // parent menu
            if(moduleElement.moduleName == moduleName){
              moduleElement.allowedPermissions?.forEach(permissionElement => {
                if(permissionElement && permissionElement.permissionName == permissionName){
                  hasAccess = true;
                }
              });   
            }
          }
          else if(moduleElement.childModules != undefined && moduleElement.childModules.length > 0){  // child menu
            moduleElement.childModules.forEach(childModulesElement => {
              if(childModulesElement.moduleName == moduleName){
                childModulesElement.allowedPermissions?.forEach(permissionElement => {
                  if(permissionElement && permissionElement.permissionName == permissionName){
                    hasAccess = true;
                  }
                });   
              }
            });
           
          }
          
      });
     });
    }
    }
    
    return hasAccess;
  }
}
