import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

 import { NgModel  } from '@angular/forms';


import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { HeaderUserComponent } from './layout-user/header-user/header-user.component';
import { Layout_UserModule } from './layout-user/layout-user.module';
import { LayoutUserComponent } from './layout-user/layout-user.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
       // CommonModule,
         BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,          
        RouterModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        PdfViewerModule,
        ToastrModule.forRoot({
          timeOut: 1000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      
    ],

      declarations: [
       // LayoutUserComponent,
       
       
  
        // LoginUserComponent,
        // RegisterUserComponent,
     
       
  ]
})
export class UserModule {}
