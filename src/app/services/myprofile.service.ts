import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {
  HostName: string = '';
  RouteName: string = '';
  userProfileImage: string = '';

  constructor(private _HttpClient: HttpClient, private _Router: Router, private _GlobalServices: GlobalService) {
    this.HostName = this._GlobalServices.hostName;
    this.RouteName = this._GlobalServices.UsersRouteName;
    this.userProfileImage = this._GlobalServices.userProfileImage;
  }

  changeUserPassword(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/changemypassword`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  getUser(): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/me`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  updateLoggedInUser(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/changemydata`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }



}
