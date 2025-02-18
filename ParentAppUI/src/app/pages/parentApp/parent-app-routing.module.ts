import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
{
  path:'',
  children:[

    {
      path: 'parentTab',
      loadChildren: () => import('../parentApp/tabs/parent-tabs.module').then(m => m.ParentTabsPageModule),
    
    },
    {
      path: '',
      redirectTo: 'parentTab',
      pathMatch: 'full',
      
    },

    
  ]
}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ParentAppRoutingModule { }
