import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenaticationsService } from '../services/authenatications.service';
import { ProductsService } from '../services/products.service';
import { OrdersService } from '../services/orders.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit,OnDestroy{
  subscription: any;
  orders: any = [];
  ordersLength: number = 0;
  page: number = 1;
  pagination: any = {};
  search: string = ''
  productCover: string = '';

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _OrdersService: OrdersService,
    private _ProductsServices: ProductsService, private _GlobalService:GlobalService) { }

  loadOrders() {
    this.subscription = this._OrdersService.getAllOrders(undefined, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.orders = res.data;
        this.ordersLength = res.length;
        this.pagination = res.pagination;
      }, error: (err) => {
      }
    })
  }
  changeNumberOfPage(page: number) {
    this.page = page;
    this.loadOrders();
  }
  setOrderPaid(orderId:string){
    this._OrdersService.setOrderPaid(orderId).subscribe({
      next: (res) => {
        this.loadOrders();
        alert('Order set to be paid')
      }
    })
  }

  setOrderDelivered(orderId: string) {
    this._OrdersService.setOrderDelivered(orderId).subscribe({
      next: (res) => {
        this.loadOrders();
        alert('Order set to be delivered')
      }
    })
  }

  searchData(data: string) {
    this.search = data;
    this.loadOrders()
  }

  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
    this.productCover = this._GlobalService.ProductCoverDomain;
    this.loadOrders();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }
}
