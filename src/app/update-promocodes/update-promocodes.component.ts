import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenaticationsService } from '../services/authenatications.service';
import { PromocodesService } from '../services/promocodes.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-promocodes',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './update-promocodes.component.html',
  styleUrl: './update-promocodes.component.scss'
})
export class UpdatePromocodesComponent implements OnDestroy,OnInit {

  subscription: any;
  promoCode: any;
  id:string='';
  promoCodeError:string='';
  promoCodeForm = new FormGroup({
    name: new FormControl(null),
    discount: new FormControl(null, [Validators.min(1), Validators.max(100)]),
    expireTime: new FormControl(null),
  })
  constructor(private _AuthenaticationsService: AuthenaticationsService, private _PromocodesService: PromocodesService, private _Router: Router, private _ActivatedRoute:ActivatedRoute) { }

  loadPromoCode(promoCodeId:string){
    this.subscription = this._PromocodesService.getPromoCode(promoCodeId).subscribe({
      next: (res) => {
        this.promoCode = res.data;
        
      }
    })
  }

  updatePromoCode(promoCodeId: string, formData: FormGroup) {
    console.log(formData.value);
    if (formData.value.name === null) {
      formData.value.name = this.promoCode.name
    }
    if (formData.value.discount === null) {
      formData.value.discount = this.promoCode.discount
    }
    if (formData.value.expireTime === null) {
      formData.value.expireTime = new DatePipe(this.promoCode.expireTime).transform
    }
    // console.log(formData.value);
    this._PromocodesService.updatePromoCode(promoCodeId, formData.value).subscribe({
      next: (res) => {
        alert('PromoCode has been Updated Successfully');
        this._Router.navigate(['/promocodes']);
      }, error: (err) => { this.promoCodeError = err.error.errors[0].msg }
    })
  }
  
  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadPromoCode(this.id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
