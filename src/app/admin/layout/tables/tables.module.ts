import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';
import { BrowserModule } from '@angular/platform-browser'
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { NhomCauHoiComponent } from './nhom-cau-hoi/nhom-cau-hoi.component';

@NgModule({
    imports: [
          CommonModule,
          TablesRoutingModule,
          PageHeaderModule,
          NgModule],
    declarations: [TablesComponent, NhomCauHoiComponent]
})
export class TablesModule {}
