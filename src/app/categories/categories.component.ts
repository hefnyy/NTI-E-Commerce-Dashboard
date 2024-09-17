import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenaticationsService } from '../services/authenatications.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {

  subscription: any;
  categories: any[] = [];
  pagination: any;
  page: number = 1;
  search: string = '';
  categoryImageDomain: string ='http://localhost:3000/categories/';

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _CategoriesService: CategoriesService) { }

  loadCategories() {
    this.subscription = this._CategoriesService.getCategories(50, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.pagination = res.pagination;
      }
    })
    // console.log(this.categories.values());
  }

  deleteCategory(categoryId: string) {
    this._CategoriesService.deleteCategory(categoryId).subscribe({
      next: (res) => {
        this.loadCategories();
        alert('Category has been Deleted successfully')
      }
    })
  }

  changeNumberOfPage(page: number) {
    this.page = page;
    this.loadCategories();
  }

  searchData(data: string) {
    this.search = data;
    this.loadCategories()
  }

  ngOnInit(): void {
    // this._AuthenaticationsService.checkToken();
    this.loadCategories();
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe() 
  };
}
