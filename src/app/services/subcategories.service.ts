import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  private HostName: string = '';
  private RouteName: string = '';
  categoryImageDomain: string = '';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.HostName = this._GlobalService.hostName;
    this.RouteName = this._GlobalService.SubcategoriesRouteName;
    
  }

  getSubcategories(limit: number = 20, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/${subcategoryId}`)
  }

  createSubcategory(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  updateSubcategory(subcategoryId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${subcategoryId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  deleteSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.HostName}${this.RouteName}/${subcategoryId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  getSpecificSubcategories(categoryId: string, limit: number = 100, sort: string = 'name'): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this._GlobalService.CategoriesRouteName}/${categoryId}/subcategory?limit=${limit}&sort=${sort}`)
  }
}

