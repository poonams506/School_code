import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthServiceProxy, Module, UserRoleDetailDto, UserRoleModulePermissionDto } from './school-api-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserRoleModulePermissionDto|undefined; // The current user object
  private userPromise: Promise<UserRoleModulePermissionDto|undefined>; // A promise to retrieve the user object
  private userToken:string | undefined;
  constructor(private http: HttpClient,private authServiceProxy:AuthServiceProxy) {}

  clearUser(){
    this.user = new UserRoleModulePermissionDto();
  }

  getUser(): Observable<UserRoleModulePermissionDto|undefined> {
    if (this.user &&  this.user.schoolId && this.user.schoolId > 0) {
      // If the user object is already cached, return it as an observable
   
      return of(this.user);
    }  else {
      let roleId = localStorage.getItem("id") as string;
      let decryptedString=CryptoJS.AES.decrypt(roleId,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
      let id = null;
      if(decryptedString != null && decryptedString != "" && decryptedString != undefined){
        id = parseInt(decryptedString);
      }
      this.userPromise = this.authServiceProxy.getUserRoleModulePermissionDetail(id).toPromise();
      return from(this.userPromise).pipe(
        tap(user =>{
          this.user = user
        })
      );
    }
   
  }

  
  refreshUser(): Observable<any> {
    let roleId = localStorage.getItem("id")!;
      let decryptedString=CryptoJS.AES.decrypt(roleId,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
      let id = null;
      if(decryptedString != null && decryptedString != "" && decryptedString != undefined){
        id = parseInt(decryptedString);
      }
    this.userPromise = this.authServiceProxy.getUserRoleModulePermissionDetail(id).toPromise();
     return from(this.userPromise).pipe(
      tap(user => this.user = user)
    );
  }

  hasRole(role: string): Observable<boolean|undefined> {
    // Check if the current user has a specific role
    return this.getUser().pipe(
      map(user => user?.roleDetails?.map(x=>x.roleName).includes(role))
    );
  }

  hasPermission(permission: string): Observable<boolean|undefined> {
 // Check if the current user has a specific permission
    return this.getUser().pipe(
      map(user => user?.roleDetails?.flatMap(a=>a.allowedModules?.flatMap(b=>b.allowedPermissions?.map(c=>c.permissionName)))
        .includes(permission))
    );

  }

  hasModule(module: string): Observable<boolean|undefined> {
    // Check if the current user has access to a specific module
    return this.getUser().pipe(
      map(user => this.buildModulePermissionDictionary(user).has(module)));
  }

  hasModulePermission(module:string,permission:string): Observable<boolean|undefined>{
     // Check if the current user has access to a specific module
     return this.getUser().pipe(
      map(user => this.checkModulePermissionExist(user,module,permission)));
  }

  checkModulePermissionExist(user:UserRoleModulePermissionDto|undefined,module:string,permission:string):boolean{
    const permissionDictionary=this.buildModulePermissionDictionary(user);
    if(permissionDictionary.has(module)){
      return this.getBooleanValue(permissionDictionary.get(module)?.includes(permission));
    }else
    {
      return false;
    }
  }

  buildModulePermissionDictionary(user:UserRoleModulePermissionDto|undefined){
    const permissionDictionary=new Map<string,string[]>();
    user?.roleDetails?.flatMap(x=>x.allowedModules).forEach(obj => this.getModulePermissionDictionary(obj, permissionDictionary));
    return permissionDictionary;
  }
  

  getModulePermissionDictionary(obj: Module|undefined, result: Map<string,string[]>): void {
    result.set(this.getStringValue(obj?.moduleName),this.getArrayValue(obj?.allowedPermissions).map(x=> x.permissionName));
    if (obj?.childModules) {
      obj.childModules.forEach(child => this.getModulePermissionDictionary(child, result));
    }
  }

   getStringValue(a: string | undefined): string {
    if (a !== undefined) {
      return a;
    }
    return '';
  }

  getBooleanValue(a:boolean|undefined):boolean{
    if (a !== undefined) {
      return a;
    }
    return false;
  }

  getArrayValue(a: (any | undefined)): any[] {
    if (a !== undefined) {
      return a;
    }
    return [];
  }

  isAuthenticated(): boolean {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    return !!token;
  }

  getAcademicYear(withCached = true):Observable<number|undefined>{
    let encryptedAcademicYearId= localStorage.getItem('academicYearId');
    if(encryptedAcademicYearId && encryptedAcademicYearId.length>0 && withCached == true){
        let decryptedString=CryptoJS.AES.decrypt(encryptedAcademicYearId,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
         return of(parseInt(decryptedString));
    }else if(withCached == false){
      return this.getUser().pipe(
        map(user => user?.academicYearId));
    }
    else{
      return this.getUser().pipe(
        map(user => user?.academicYearId));
    }
   
  }

 
 setAcademicYear(academicYearId:number){

  let encryptedString=CryptoJS.AES.encrypt(academicYearId.toString(), environment.ENCRYPTION_PASSWORD).toString();
  localStorage.setItem('academicYearId',encryptedString);
 }

  getSchoolCode():Observable<string|undefined>{
    return this.getUser().pipe(
      map(user => user?.schoolCode));
  }

  getSchoolId():Observable<number|undefined>{
    return this.getUser().pipe(
      map(user => user?.schoolId));
  }

  setSchoolId(schoolId:number){
    if(this.user)
    {
      this.user.schoolId=schoolId;
    }
  }

  getUserRoleId(){
    let id = 0;
    let roleId = localStorage.getItem("id")!;
      let decryptedString=CryptoJS.AES.decrypt(roleId,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
      if(decryptedString != null && decryptedString != "" && decryptedString != undefined){
        id = parseInt(decryptedString);
      }
     return id;
  }

  getUserRefId(){
    let id = 0;
    let refId = localStorage.getItem("refId")!;
      let decryptedString=CryptoJS.AES.decrypt(refId,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
      if(decryptedString != null && decryptedString != "" && decryptedString != undefined){
        id = parseInt(decryptedString);
      }
     return id;
  }

  set UserToken(token:string){
    this.userToken=token;
    localStorage.setItem('token',this.userToken);
  }

  get UserToken():string{
    if(this.userToken){
      return this.userToken;
    }else{
      return localStorage.getItem('token') as string;
    }
    
  }

  getUserIdByRole():Observable<number|undefined>{
    return this.getUser().pipe(
      map(user => user?.userIdByRole));
  }

  
}
