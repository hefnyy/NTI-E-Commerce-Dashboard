import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy {
  subscription: any;
  products: any[] = [];
  pagination: any;
  page: number = 1;
  search: string = '';
  productsCoverDomain: string = 'http://localhost:3000/products/';

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _CategoriesService: CategoriesService,
    private _ProductsService: ProductsService, private _SubcategoriesService:SubcategoriesService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(15, this.page, 'category subcategory name', this.search).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      }
    })
    // console.log(this.products.values());
  }

  deleteProduct(productId: string) {
    this._ProductsService.deleteProduct(productId).subscribe({
      next: (res) => {
        this.loadProducts();
        alert('Product has been Deleted Successfully')
      }
    })
  }

  changeNumberOfPage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  searchData(data: string) {
    this.search = data;
    this.loadProducts()
  }

  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  };
}
