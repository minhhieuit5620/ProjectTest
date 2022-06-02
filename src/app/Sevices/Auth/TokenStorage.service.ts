import { Injectable } from '@angular/core';

// const TOKEN_ADMIN_KEY = 'auth-admin-token';
// const ADMIN_KEY = 'auth-admin';
const TOKEN_USER_KEY = 'auth-user-token';
const USER_KEY = 'auth-user';

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
    localStorage.setItem(USER_KEY, JSON.stringify(user));
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
}
