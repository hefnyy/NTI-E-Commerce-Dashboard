import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PromocodesService } from '../services/promocodes.service';

@Component({
  selector: 'app-add-promocodes',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './add-promocodes.component.html',
  styleUrl: './add-promocodes.component.scss'
})
export class AddPromocodesComponent implements OnInit {
  
  promoCodeError: string = '';

  promoCodeForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
    expireTime: new FormControl(null, [Validators.required]),
  })
  
  constructor(private _AuthenaticationsService: AuthenaticationsService, private _PromocodesService: PromocodesService, private _Router: Router) { }

  createPromoCode(formData: FormGroup) {
    this._PromocodesService.createPromoCode(formData.value).subscribe({
      next: (res) => {
        alert('PromoCode has been Added Successfully');
        this._Router.navigate(['/promocodes'])
      },
      error: (err) => { this.promoCodeError = err.error.errors[0].msg }
    })
  }

  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
  }
}
