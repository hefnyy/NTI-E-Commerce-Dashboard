import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { CategoriesService } from '../services/categories.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {

  subscription: any;
  category: any={};
  categoryError:string = '';
  categoryForm = new FormGroup({
    name: new FormControl(null,[Validators.required])
})

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _CategoriesService: CategoriesService, private _Router:Router) { }

  createCategory(formData: FormGroup){
    this._CategoriesService.createCategory(formData.value).subscribe({
      next:(res) => {
        alert('Category has been Created Successfully')
        this._Router.navigate(['/categories'])
      },
      error:(err) => {
        this.categoryError = err.error.errors[0].msg;
        
      }
    })
  }

  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
    
  }

}
