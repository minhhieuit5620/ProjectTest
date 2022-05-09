import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { HeaderComponent } from './components/header/header.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutUserComponent } from './layout-user.component';
// import { LayoutComponent } from './layout.component';

export const Mainroutes: Routes = [
  {    
    path: '', component: LayoutUserComponent ,
    
    children: [
     //{path: '', component: MainsComponent }, 
      {path:'',component:HomeComponent},
      {path:"home",component:HomeComponent},
      {path:"KhaoSat",component:SurveyComponent},
      // { path: 'products', component: ProductComponent }, 
      // {path:'detail/:id/:IdCategory',component:DetailProductComponent},
      // { path: 'projects', component: ProjectComponent }, 
      // {path:'detailProject/:Id_project/:Id_cate_project',component:DetailProjectComponent},
      // {path:'contact',component:ContactComponent},
      // //{path:'detailProject',component:DetailProjectComponent},
      // {path:'cart',component:CartComponent},
      
      // /detailProject/{{item.Id_project}}
    ]
    
  },

];

@NgModule({
    imports: [
      CommonModule, 
     // LayoutRoutingModule, 
      NgbDropdownModule,
      NgbModule,
     RouterModule.forChild(Mainroutes)
    
    ],
    declarations: [
    LayoutUserComponent,
    SurveyComponent,
    HomeComponent,
       
  ]
    // declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
})
export class Layout_UserModule {

}
