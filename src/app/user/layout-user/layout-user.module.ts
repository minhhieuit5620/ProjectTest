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
import { DetailNewComponent } from './detail-new/detail-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { ManualComponent } from './manual/manual.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { FooterUserComponent } from './footer-user/footer-user.component';
import { CompanyComponent } from './company/company.component';
import { AuthGuardService } from 'src/app/Sevices/Auth/auth-guard.service';
import { AuthGuardUser } from 'src/app/Sevices/Auth/auth-guard-user.service';
import { LogoutUserGuard } from 'src/app/Sevices/Auth/logout-user.guard';

// import { LayoutComponent } from './layout.component';

export const Mainroutes: Routes = [
  {    
    path: '', component: LayoutUserComponent ,
    
    children: [
      // {
      //   path: '', component: NhomCauHoiComponent,canActivate : [AuthGuardService],
      // },
     //{path: '', component: MainsComponent }, 
      {path:'',component:HomeComponent},
      {path:"Home",component:HomeComponent},
      {
        path:"Survey",component:SurveyComponent,canActivate: [AuthGuardUser]
      },
      {path:"LoginUser",component:LoginUserComponent,canActivate: [LogoutUserGuard]
      }, 
      {path:"RegisterUser",component:RegisterUserComponent,canActivate: [LogoutUserGuard]},
      
      {path:"Introduce",component:IntroduceComponent},
      {path:"Manual",component:ManualComponent},
      {path:"Company",component:CompanyComponent},
      {path:"Detail/:id",component:DetailNewComponent}

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
     // HeaderUserComponent,
     // LayoutRoutingModule, 
     
      NgbDropdownModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
     RouterModule.forChild(Mainroutes)
    
    ],
    declarations: [
    LayoutUserComponent,
    SurveyComponent,
    HomeComponent,
    HeaderUserComponent,
    DetailNewComponent,
       LoginUserComponent,
       RegisterUserComponent,
       ManualComponent,
       IntroduceComponent,
       FooterUserComponent,
       CompanyComponent,
     
       
  ]
  
  ,providers: [AuthGuardUser,LogoutUserGuard],    // declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
})
export class Layout_UserModule {

}
