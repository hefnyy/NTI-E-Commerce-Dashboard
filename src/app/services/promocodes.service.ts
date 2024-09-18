import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocodesService {
  private HostName: string = '';
  private RouteName: string = '';
  categoryImageDomain: string = '';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.HostName = this._GlobalService.hostName;
    this.RouteName = this._GlobalService.PromoCodesRouteName;
  }

  getAllPromoCodes(limit: number = 20, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  getPromoCode(promoCodeId: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/${promoCodeId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  createPromoCode(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  updatePromoCode(promoCodeId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${promoCodeId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  deletePromoCode(promoCodeId: string): Observable<any> {
    return this._HttpClient.delete(`${this.HostName}${this.RouteName}/${promoCodeId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }
}
