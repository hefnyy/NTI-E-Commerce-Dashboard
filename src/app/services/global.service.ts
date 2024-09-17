import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  hostName: string = 'http://localhost:3000';
  AuthenaticationRouteName: string = '/api/v1/authentication';
  ProductsRouteName: string = '/api/v1/products';
  CategoriesRouteName: string = '/api/v1/categories';
  SubcategoriesRouteName: string = '/api/v1/subcategory';
  ProductCoverDomain: string = 'http://localhost:3000/products/';
  CategoriesImageDomain: string = 'http://localhost:3000/categories/';
  SubcategoriesImageDomain: string = 'http://localhost:3000/subcategory/';
  ReviewsRouteName: string = '/api/v1/reviews';
  PromoCodesRouteName: string = '/api/v1/promocodes';
  OrdersRouteName: string = '/api/v1/orders';
  UsersRouteName: string = '/api/v1/users';
  userProfileImage: string = `${this.hostName}/users/`
  categoryImageDomain: string = `${this.hostName}/categories/`;
  constructor() {   
   }
}
