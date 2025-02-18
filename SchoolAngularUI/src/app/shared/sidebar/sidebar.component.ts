import { Component, OnInit, Input } from '@angular/core';
import { NavCollapseService } from 'src/app/services/nav-collapse.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import { AuthServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isShown = false;
  public uiBasicCollapsed = false;
  public uiBasicCollapsedr = false;

  openSidebar: boolean = true;
  menuSidebar : any = [];
  logoUrl : string;
  isLogoImage:boolean=true;

  constructor(private navservice: NavCollapseService,
    private breakpointObserver: BreakpointObserver,
    public sharedService : UserService,
    private authClient:AuthServiceProxy,
    private router:Router,
    private userService:UserService) {
  }


  ngOnInit(): void {
    this.navservice.getNavCollapse().subscribe(x => {
      this.uiBasicCollapsed = x;
    });
    this.menuSidebar = [];
  

    this.userService.getUser().subscribe(response =>{
      const result=response!;
      let encryptedPermission=CryptoJS.AES.encrypt(JSON.stringify(result),environment.ENCRYPTION_PASSWORD).toString();
      localStorage.setItem("permissions", encryptedPermission);
      this.logoUrl = result.logoUrl!;
      if(!result.logoUrl)
      {
        this.isLogoImage=false;
      }
      result.roleDetails?.forEach(allowedModulesElement => {
      allowedModulesElement.allowedModules?.forEach(moduleElement => {
        if(moduleElement.childModules?.length == 0){ // parent menu
          this.menuSidebar.push({
            link_name : moduleElement.moduleName?.toString(), 
            link_key : moduleElement.moduleKey?.toString(), 
            sub_menu : [], 
            icon : moduleElement.menuIcon?.toString(), 
            link : moduleElement.menuUrl?.toString()
          });
        }
        else if(moduleElement.childModules != undefined && moduleElement.childModules.length > 0){  // child menu
          let childMenu : any=[];
          moduleElement.childModules.forEach(childModulesElement => {
            childMenu.push({
              link_name :  childModulesElement.moduleName?.toString(),
              link_key : childModulesElement.moduleKey?.toString(), 
              link : childModulesElement.menuUrl?.toString()
            });
          });
          this.menuSidebar.push({
            link_name : moduleElement.moduleName?.toString(), 
            link_key : moduleElement.moduleKey?.toString(), 
            sub_menu : childMenu, 
            icon : moduleElement.menuIcon?.toString(), 
            link : moduleElement.menuUrl?.toString()
          });
        }
        
    });
   });
    });

    //media breakpoints

  }

  deviceSidemenuCollapse(): void {
   
    if (this.breakpointObserver.isMatched('(max-width:769px)')) {
      this.navservice.sidebarToggle();
      this.navservice.setNavCollapse(false);
    }

  }

  sidebarToggle(): void {
    this.navservice.sidebarToggle();
    this.navservice.setNavCollapse(false);
  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }


}




