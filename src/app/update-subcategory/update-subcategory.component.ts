import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenaticationsService } from '../services/authenatications.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './update-subcategory.component.html',
  styleUrl: './update-subcategory.component.scss'
})
export class UpdateSubcategoryComponent implements OnInit,OnDestroy {
  subscription: any;
  id: string = '';
  subcategory: any = '';
  subcategoryError: string = '';
  updateSubcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  })
  constructor(private _AuthenaticationsService: AuthenaticationsService, private _SubcategoriesService: SubcategoriesService,
    private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }

  loadSubcategory(categoryId: string) {
    this.subscription = this._SubcategoriesService.getSubcategory(categoryId).subscribe({
      next: (res) => {
        this.subcategory = res.data
      },
      error: (err) => {
        this.subcategoryError = err.error.message
      }
    })
  }

  updateSubcategory(categoryId: string, formData: FormGroup) {
    this._SubcategoriesService.updateSubcategory(categoryId, formData.value).subscribe({
      next: (res) => {
        alert('This Category has been updated Successfully');
        this._Router.navigate(['/categories']);
      },
      error: (err) => {
        this.subcategoryError = err.error.errors[0].msg
      }
    })
  }

  ngOnInit(): void {
    // this._AuthenaticationsService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadSubcategory(this.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  };
}
