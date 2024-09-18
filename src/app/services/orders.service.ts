import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private HostName: string = '';
  private RouteName: string = '';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.HostName = this._GlobalService.hostName;
    this.RouteName = this._GlobalService.OrdersRouteName;
  }

  getAllOrders(limit: number = 20, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  getOrder(orderId: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/${orderId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  setOrderPaid(orderId: string): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${orderId}/paid`,{}, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  setOrderDelivered(orderId: string): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${orderId}/delivered`, {},{ headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }
}
