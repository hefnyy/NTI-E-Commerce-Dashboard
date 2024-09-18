import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private HostName: string = '';
  private RouteName: string = '';
  productCoverDomain: string = '';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.HostName = this._GlobalService.hostName;
    this.RouteName = this._GlobalService.ProductsRouteName;

  }

  getAllProducts(limit: number = 20, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getProduct(ProductId: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/${ProductId}`)
  }

  createProduct(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  updateProduct(ProductId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${ProductId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  deleteProduct(ProductId: string): Observable<any> {
    return this._HttpClient.delete(`${this.HostName}${this.RouteName}/${ProductId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }
}
