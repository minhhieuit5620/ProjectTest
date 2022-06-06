import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, 
         LoginRoutingModule,
      
      
     // LayoutRoutingModule, 
      NgbDropdownModule,
      NgbModule,
      FormsModule,
        ],
    declarations: []
})
export class LoginModule {}
