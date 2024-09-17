import { Component } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent {
  subscription: any;
  subcategories: any[] = [];
  pagination: any;
  page: number = 1;
  search: string = '';
  subcategoryImageDomain: string = 'http://localhost:3000/subcategory/';

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _SubategoriesService: SubcategoriesService) { }

  loadSubcategories() {
    this.subscription = this._SubategoriesService.getSubcategories(20, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.subcategories = res.data;
        this.pagination = res.pagination;
      }
    })
    // console.log(this.categories.values());
  }

  deleteSubcategory(categoryId: string) {
    this._SubategoriesService.deleteSubcategory(categoryId).subscribe({
      next: (res) => {
        this.loadSubcategories();
        alert('Subcategory has been Deleted successfully')
      }
    })
  }

  changeNumberOfPage(page: number) {
    this.page = page;
    this.loadSubcategories();
  }

  searchData(data: string) {
    this.search = data;
    this.loadSubcategories();
  }

  ngOnInit(): void {
    // this._AuthenaticationsService.checkToken();
    this.loadSubcategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  };
}
