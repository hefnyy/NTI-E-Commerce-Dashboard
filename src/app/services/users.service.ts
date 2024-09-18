import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private HostName: string = '';
  private RouteName: string = '';
  userImageDomain: string='';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.HostName = this._GlobalService.hostName;
    this.RouteName = this._GlobalService.UsersRouteName;
    this.userImageDomain = 'http://localhost:3000/users/';
  }
  getAllUsers(limit: number = 20, page: number = 1, sort: string = '-createdAt', search: string,role:string = 'adimn'): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}&role=${role}&fields=-password`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  getUser(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/${userId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  updateUserPassword(userId: string,formData:any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${userId}/updatePassword`, {formData}, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }
  createUser(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }
  deleteUser(userId: string): Observable<any> {
    return this._HttpClient.delete(`${this.HostName}${this.RouteName}/${userId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }
  updateUser(userId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${userId}`,formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }
}
