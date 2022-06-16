import { Injectable } from '@angular/core';

// const TOKEN_ADMIN_KEY = 'auth-admin-token';
// const ADMIN_KEY = 'auth-admin';
const TOKEN_USER_KEY = 'auth-user-token';
const USER_KEY = 'auth-user';

const TOKEN_ADMIN_KEY='auth-admin-token';
const ADMIN_KEY='auth-admin';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  public saveTokenUser(token: string): void {
    const second = 120 * 60 * 1000;
    localStorage.removeItem(TOKEN_USER_KEY);
    localStorage.setItem(TOKEN_USER_KEY, token);
    setTimeout(() => {
      localStorage.removeItem(TOKEN_USER_KEY);
      alertify
        .alert()
        .setHeader('Phiên đăng nhập đã hết hạn!')
        .setting({
          message: 'Vui lòng đăng nhập lại',
          onok: function () {
            window.location.href = '/loginUser';
          },
        })
        .show();
    }, second);
  }


  public getToken_User(): string | null {
    return localStorage.getItem(TOKEN_USER_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, user);
  }
  public removeToken() {
    return localStorage.clear();
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }

    return {};
  }

  //Login Admin
  
  public saveTokenAdmin(token: string): void {
    const second = 120 * 60 * 1000;
    localStorage.removeItem(TOKEN_ADMIN_KEY);
    localStorage.setItem(TOKEN_ADMIN_KEY, token);
    setTimeout(() => {
      localStorage.removeItem(TOKEN_ADMIN_KEY);
      alertify
        .alert()
        .setHeader('Phiên đăng nhập đã hết hạn!')
        .setting({
          message: 'Vui lòng đăng nhập lại',
          onok: function () {
            window.location.href = '/admin/Login';
          },
        })
        .show();
    }, second);
  }


  public getToken_Admin(): string | null {
    return localStorage.getItem(TOKEN_ADMIN_KEY);
  }

  public saveAdmin(admin: string): void {
    localStorage.removeItem(ADMIN_KEY);
    localStorage.setItem(ADMIN_KEY, admin);
  }


  public getAdmin(): any {
    const admin = localStorage.getItem(ADMIN_KEY);
    if (admin) {
      return admin;
    }

    return {};
  }



}
