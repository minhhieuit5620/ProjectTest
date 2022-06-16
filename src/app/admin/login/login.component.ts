import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Sevices/Auth/auth.service';
import { TokenStorageService } from 'src/app/Sevices/Auth/TokenStorage.service';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    form: any = {
        EmailCus: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    token: string[]
    roles: string[] = [];
    user: { userName: string, passWord: string }
    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,       
        private route: Router
    ) { }

    ngOnInit() { }

    // onLoggedin() {
    //     localStorage.setItem('isLoggedin', 'true');
    // }


    onSubmit(): void {

        const { userName, password } = this.form;
        this.authService.loginAdmin(userName, password).subscribe(
            (data) => {
                this.tokenStorage.saveTokenAdmin(data.token);
                this.tokenStorage.saveAdmin(data.admin);
                this.route.navigate(['/admin/dashboard']);
            },
            (err) => {
                console.log("d2")
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }


        );

    }
}
