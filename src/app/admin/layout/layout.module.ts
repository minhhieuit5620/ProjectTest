import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NhomCauHoiComponent } from './tables/nhom-cau-hoi/nhom-cau-hoi.component';
import { FormsModule } from '@angular/forms';
import { TablesComponent } from './tables/tables.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';

export const Mainroutes: Routes = [
    {    
      path: '', component: LayoutComponent ,
      
      children: [
        {
          path:'',component:NhomCauHoiComponent
         },
          {
              path:'NhomCauHoi',component:NhomCauHoiComponent
          },
          {
            path:'table',component:TablesComponent
        }
       //{path: '', component: MainsComponent }, 
        // {path:'',component:HomeComponent},
        // {path:"home",component:HomeComponent},
        // {path:"KhaoSat",component:SurveyComponent},
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
     // BrowserModule,
      CommonModule, 
      
     // LayoutRoutingModule, 
      NgbDropdownModule,
      NgbModule,
      FormsModule,
      // BrowserAnimationsModule,
     RouterModule.forChild(Mainroutes)
    
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
    LayoutComponent,
    TablesComponent, 
    SidebarComponent, 
    HeaderComponent,
    PageHeaderComponent,
    NhomCauHoiComponent
  ]
})
export class LayoutModule {
    
}
