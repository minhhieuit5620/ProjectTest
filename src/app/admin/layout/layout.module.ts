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
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KhaoSatComponent } from './tables/khao-sat/khao-sat.component';
import { AuthGuardService } from 'src/app/Sevices/Auth/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CompanyMnComponent } from './tables/company-mn/company-mn.component';
import { QAndAComponent } from './tables/q-and-a/q-and-a.component';
import { UserComponent } from './tables/user/user.component';
import { LogoutAdminGuard } from 'src/app/Sevices/Auth/logout-admin.guard';
import { ProfileComponent } from './tables/profile/profile.component';
import { TintucComponent } from './tables/tintuc/tintuc.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DotKhaoSatComponent } from './tables/dot-khao-sat/dot-khao-sat.component';
import { ContactComponent } from './tables/contact/contact.component';
export const Mainroutes: Routes = [
  {
    path: '', component: LayoutComponent,canActivate: [AuthGuardService],

    children: [
      {
        path: '', component: DashboardComponent,
      },
      {
        path: 'NhomCauHoi', component: NhomCauHoiComponent,
      },
      {
        path: 'Table', component: TablesComponent ,
      },
      {
        path: 'KhaoSat', component: KhaoSatComponent,
      },
      {
        path: 'DoanhNghiep_Mn', component: CompanyMnComponent,
      },
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'QA', component: QAndAComponent,
      },
      {
        path: 'User', component: UserComponent,
      },
      {
        path: 'Profile', component: ProfileComponent,
      },
      {
        path:'TinTuc', component:TintucComponent,
      },
      {
        path:'DotKhaoSat', component:DotKhaoSatComponent,
      },
      {
        path:'Contact', component:ContactComponent,
      }
      

    ]

  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: '**', component: NotFoundComponent,
  },

];
@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    CKEditorModule,
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
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent,
    PageHeaderComponent,
    NhomCauHoiComponent,
    KhaoSatComponent,
    CompanyMnComponent,
    QAndAComponent,
    UserComponent,
    ProfileComponent,
    TintucComponent,
    DotKhaoSatComponent,
    ContactComponent
  ],
  providers: [AuthGuardService,LogoutAdminGuard],
})
export class LayoutModule {

}
