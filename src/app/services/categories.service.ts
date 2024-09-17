import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private HostName: string = '';
  private RouteName: string = '';
  categoryImageDomain: string='';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.HostName = this._GlobalService.hostName;
    this.RouteName = this._GlobalService.CategoriesRouteName;
    this.categoryImageDomain=this._GlobalService.categoryImageDomain;
  }

  getCategories(limit: number = 20, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/${categoryId}`)
  }

  createCategory(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  updateCategory(categoryId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${categoryId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.HostName}${this.RouteName}/${categoryId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }
}
