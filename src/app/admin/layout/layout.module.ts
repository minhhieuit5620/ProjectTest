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

export const Mainroutes: Routes = [
  {
    path: '', component: LayoutComponent,canActivate : [AuthGuardService],

    children: [
      {
        path: '', component: NhomCauHoiComponent,canActivate : [AuthGuardService],
      },
      {
        path: 'NhomCauHoi', component: NhomCauHoiComponent,canActivate : [AuthGuardService],
      },
      {
        path: 'Table', component: TablesComponent ,canActivate : [AuthGuardService],
      },
      {
        path: 'KhaoSat', component: KhaoSatComponent,canActivate : [AuthGuardService],
      },
      {
        path: 'dashboard', component: DashboardComponent,canActivate : [AuthGuardService],
      },
      {
        path: '**', component: NotFoundComponent,
      },



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
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    PageHeaderComponent,
    NhomCauHoiComponent,
    KhaoSatComponent
  ],
  providers: [AuthGuardService],
})
export class LayoutModule {

}
