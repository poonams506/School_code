import { Component, OnInit, Input } from '@angular/core';
import { NavCollapseService } from 'src/app/services/nav-collapse.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import { AuthServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-parent-menu',
  templateUrl: './parent-menu.component.html',
  styleUrls: ['./parent-menu.component.scss']
})
export class ParentMenuComponent implements OnInit {
  isShown = false;
  public uiBasicCollapsed = false;
  public uiBasicCollapsedr = false;

  openSidebar: boolean = true;
  // menuSidebar : any = [];
  menuSidebar = [
    {
      link_name: "School Profile",
      link: "/school-profile",
      icon: "bi bi-house",
      sub_menu: []
    }, {
      link_name: "Student",
      link: "/students",
      icon: "bi bi-person",
      sub_menu: [
        {
          link_name: "Users",
          link: "/users",
        }, {
          link_name: "Customers",
          link: "/customers",
        }, {
          link_name: "Orders",
          link: "/orders",
        }
      ]
    }
  ]


  constructor(private navservice: NavCollapseService,
    private breakpointObserver: BreakpointObserver,
    public sharedService : UserService,
    private authClient:AuthServiceProxy,
    private router:Router) {
  }


  ngOnInit(): void {

    this.navservice.getNavCollapse().subscribe(x => {
      this.uiBasicCollapsed = x;
    });
    this.menuSidebar = [];
    

    //media breakpoints

  }

  deviceSidemenuCollapse(): void {
    // this.breakpointObserver.observe([
    //     Breakpoints.XSmall,
    //     Breakpoints.Small,
    //     Breakpoints.Medium,
    //     Breakpoints.Large,
    //     Breakpoints.XLarge
    //   ]).subscribe(result => {
    //     if (result.breakpoints[Breakpoints.Large]) {
    //   this.navservice.sidebarToggle();
    //  this.navservice.setNavCollapse(false);
    //     }

    //   });

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




