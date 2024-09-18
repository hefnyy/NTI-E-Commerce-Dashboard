import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenaticationsService } from '../services/authenatications.service';
import { CategoriesService } from '../services/categories.service';
import { Router, RouterLink } from '@angular/router';
import { SubcategoriesService } from '../services/subcategories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.scss'
})
export class AddSubcategoryComponent implements OnInit,OnDestroy {
  subcategory: any = {};
  subcategoryError: string = '';
  categoriesSubscription: any;
  categories:any[]=[];
  subcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required])
  })

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _SubcategoriesService: SubcategoriesService,
    private _Router: Router, private _CategoriesService:CategoriesService) { }

  createSubcategory(formData: FormGroup) {
    this._SubcategoriesService.createSubcategory(formData.value).subscribe({
      next: (res) => {
        
        alert('Subcategory has been Created Successfully')
        this._Router.navigate(['/subcategories'])
        
      },
      error: (err) => {
        this.subcategoryError = err.error.errors[0].msg;

      }
    })
  }
  getAllCategories(){
    this.categoriesSubscription = this._CategoriesService.getCategories(100,undefined,'name','').subscribe({
      next: (res) => {
        this.categories=res.data;
      }
    })
  }

  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
    this.getAllCategories();

  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe(); 
  }
}
