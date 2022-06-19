import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';
import { BrowserModule } from '@angular/platform-browser'
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { NhomCauHoiComponent } from './nhom-cau-hoi/nhom-cau-hoi.component';
import { KhaoSatComponent } from './khao-sat/khao-sat.component';
import { CompanyMnComponent } from './company-mn/company-mn.component';
import { QAndAComponent } from './q-and-a/q-and-a.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { TintucComponent } from './tintuc/tintuc.component';
import { DotKhaoSatComponent } from './dot-khao-sat/dot-khao-sat.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
    imports: [
          CommonModule,
          TablesRoutingModule,
          PageHeaderModule,
       
          NgModule],
    declarations: [
        TablesComponent, 
        NhomCauHoiComponent,
         KhaoSatComponent,
          CompanyMnComponent, 
          QAndAComponent, 
          UserComponent, 
          ProfileComponent,
           TintucComponent,
           DotKhaoSatComponent,
           ContactComponent
           ]
})
export class TablesModule {}
