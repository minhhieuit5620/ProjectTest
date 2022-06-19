import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
 import { NgModel  } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LayoutComponent } from './admin/layout/layout.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { UserLoginComponent } from './user/user-login/user-login.component';
import { HeaderUserComponent } from './user/layout-user/header-user/header-user.component';
import { LoginComponent } from './admin/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
    imports: [
       // CommonModule,
         BrowserModule,
     BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        PdfViewerModule,
        CKEditorModule,

    // ToastrModule.forRoot({ positionClass: 'inline' }),
    // ToastContainerModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          }),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent,AdminComponent, UserComponent ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
