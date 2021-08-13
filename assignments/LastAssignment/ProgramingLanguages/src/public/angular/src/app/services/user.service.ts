import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../navigation/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient ) { }
   doLogin(user:User) :Observable<any> {
    return this._http.post<boolean>(environment.apiBaseUrl + 'accounts/login', user);
  }
  register(user:User) : Observable<boolean> {
    return this._http.post<boolean>(environment.apiBaseUrl + 'accounts/register', user);
  }
  isAuthenticated(): boolean {
    return sessionStorage.getItem('token') !== null;
  }
  logout(): void {
    sessionStorage.removeItem('token');
  }
  // get user info from jwt token payload
  getUserInfo(): User | null {
   const token =sessionStorage.getItem('token')?.toString();
   if (token) {
    return  getPayload(token??"") as User;
   }
   return null;
  }
}
// function to extant payload from jwt token
function getPayload(token: string): any {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('JWT must have 3 parts');
  }
  const decoded = JSON.parse(atob(parts[1]));
  return decoded;
}
