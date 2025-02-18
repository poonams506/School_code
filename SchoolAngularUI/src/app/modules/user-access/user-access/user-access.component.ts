import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base-component';
import { AccessServiceProxy, ModuleDto, ModuleMasterDto, ModulePermissionDto, Permission, PermissionDto, PermissionMasterDto, RoleMasterDto, RoleModuleDto } from 'src/app/services/school-api-service';
import { NgbAccordion, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent  implements OnInit{

  activePanel: string[]=[];

  

  roleList:RoleModuleDto[]=[];
  moduleList:ModuleDto[]=[];
  permissionList:PermissionDto[]=[];
  currentRoleModule:RoleModuleDto;

  rolePermissionUIModel:RoleModuleDto;
  @ViewChild('acc', { static: true }) accordionElement: NgbAccordion;

  constructor(private userAccessService:AccessServiceProxy,
    public translate: TranslateService) {
  }

  

   ngOnInit(): void {

    this.currentRoleModule=new RoleModuleDto();
    this.getUserRoles();
    this.getModuleList();
    this.getPermissionList();
  
   }


   updateRolePermissionUIModel(roleDetail:RoleModuleDto)
   {
      this.currentRoleModule=new RoleModuleDto();
      this.currentRoleModule.roleId=roleDetail.roleId;
      this.currentRoleModule.roleName=roleDetail.roleName;
      this.currentRoleModule.roleNameKey=roleDetail.roleNameKey;
      this.currentRoleModule.modules=[];
      this.moduleList.forEach(module => {
        let modulePermission=new ModulePermissionDto();
        modulePermission.moduleId=module.moduleId;
        modulePermission.moduleName=module.moduleName;
        modulePermission.moduleNameKey=module.moduleKey;
        modulePermission.menuUrl=module.menuUrl;
        modulePermission.modulePermissions=[];
        this.permissionList.forEach(permission => {
          let currentPermission=new PermissionDto();
          currentPermission.permissionId  =permission.permissionId;
          currentPermission.permissionName=permission.permissionName;
          currentPermission.permissionNameKey=permission.permissionNameKey;
          currentPermission.roleId=roleDetail.roleId;
          currentPermission.moduleId=module.moduleId;
        let permissionLength=  roleDetail.modules?.filter(x=>x.moduleId==module.moduleId).flatMap(x=>x.modulePermissions).flatMap(x=>x?.permissionId).filter(x=>x==permission.permissionId).length;
         if(permissionLength && permissionLength>0 ){
          currentPermission.isChecked=true;
         }else{
          currentPermission.isChecked=false;
         }

          modulePermission.modulePermissions?.push(currentPermission);

        });
        modulePermission.modulePermissions.filter(x=>x.permissionId==-1).forEach(x=>{
       
          let modulePermissionLength=  roleDetail.modules?.filter(x=>x.moduleId==module.moduleId).map(x=>x.modulePermissions).length;
          x.isChecked=  modulePermissionLength==this.permissionList.length-1;
        });
        this.currentRoleModule.modules?.push(modulePermission);
      });
    let currentPanelRole=  this.roleList.filter(x=>x.roleId==roleDetail.roleId);
    if(currentPanelRole && currentPanelRole.length>0){
      currentPanelRole[0].modules=this.currentRoleModule.modules;
    }
   }

   getModuleList(){
    this.userAccessService.getModuleList().subscribe((module:ModuleMasterDto)=>{
      this.moduleList=module.modules;
    });
   }

   getPermissionList(){
    this.userAccessService.getPermissionsList().subscribe((permissionList:PermissionMasterDto)=>{
        this.permissionList= permissionList.permissions as PermissionDto[];
        let allPermisson=new PermissionDto();
        allPermisson.permissionId=-1
        allPermisson.permissionName="All";
        allPermisson.permissionNameKey="ALL";
        this.permissionList.unshift(allPermisson);
    });
   }

   getUserRoles(){
    this.userAccessService.getRoleList().subscribe((roleDetail:RoleMasterDto)=>{
        this.roleList=roleDetail.roles as RoleModuleDto[];
       
        if(this.roleList.length>0){
        
          this.getModulePermisisonByRoleId(this.roleList[0].roleId as number,true);
        }

    });
   }

   openPanel(panelId:string)
   {
    this.accordionElement.toggle(panelId);
   }

   changePanelCalled(event:NgbPanelChangeEvent){
      this.activePanel=[];
      if(event.nextState){
        this.activePanel.push(event.panelId);
        this.getModulePermisisonByRoleId(parseInt(event.panelId),false);
      }
   }
   getModulePermisisonByRoleId(roleId:number,isFirst:boolean){
    this.userAccessService.getModulesPermissions(roleId).subscribe((roleModulePermission:RoleModuleDto)=>{
       this.updateRolePermissionUIModel(roleModulePermission);
       if(isFirst){
        this.openPanel(roleId.toString());
       }
    });
   }
  
   
 userAccessUpdateSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('USER_ACCESS_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}


   saveUserRoleAccess(roleDetail:RoleModuleDto){
    
   let roleDetailToSave:PermissionDto[]=[];
    roleDetail.modules?.flatMap(x=>x.modulePermissions).filter(y=> y?.permissionId!=-1 && y?.isChecked===true)
   .forEach(permission=>{
      roleDetailToSave.push(permission as PermissionDto)
    });

   if(roleDetailToSave && roleDetailToSave.length>0){
    
    this.userAccessService.rolePermissionUpsert(roleDetailToSave).subscribe((result)=>{
        this.userAccessUpdateSuccessNotification();
    });
   }
    
   }

   toggleAllForModule(isChecked:boolean|undefined,module:ModulePermissionDto){
    if(isChecked!=undefined)
    {
      module.modulePermissions?.forEach(permission=>{
        permission.isChecked=isChecked
      });
    }
    
   }

   
   toggleAllCheckbox(isChecked:boolean|undefined,module:ModulePermissionDto){
    if(isChecked!=undefined)
    {
     let permissionLength= module.modulePermissions?.filter(x=>x.isChecked===true).length;
      if(permissionLength==this.permissionList.length-1 )
      module.modulePermissions?.filter(x=>x.permissionId==-1)?.forEach(permission=>{
        permission.isChecked=isChecked
      });
    }
    
   }
}
