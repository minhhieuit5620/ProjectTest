import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Sevices/Auth/auth.service';
import { TokenStorageService } from 'src/app/Sevices/Auth/TokenStorage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit { 
  form: any = {
    EmailCus: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  token:string[]
  roles: string[] = [];
  user:{userName:string,passWord:string}
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private _location: Location,
    private toastr:ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  // onSubmit(): void {
  //   this.authService
  //     .loginUser(this.form.value.email, this.form.value.password)
  //     .subscribe(
  //       (data) => {
  //        // console.log(this.form.value.email);
  //         this.tokenStorage.saveTokenUser(data.token);
  //         this.tokenStorage.saveUser(data.user);
  //         this._location.back();
  //       },
  //       (err) => {}
  //     );
  // }
  onSubmit(): void {

    const { EmailCus,password } = this.form;
    this.authService.loginUser(EmailCus, password).subscribe(    
       (data) => {
         console.log(EmailCus);
         
         this.tokenStorage.saveTokenUser(data.token);
         this.tokenStorage.saveUser(data.users);
         this.toastr.success('Đăng nhập thành công', 'Thành công ');    
         this.route.navigate(['/']);
       },
       (err) => {
         console.log("d2")
               this.errorMessage = err.error.message;
               this.isLoginFailed = true;
       }


     );

  }
}
