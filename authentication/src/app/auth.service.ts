import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUser = 'http://localhost:3000/api/register';
  private _loginUser = 'http://localhost:3000/api/login';
  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUser, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUser, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
