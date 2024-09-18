import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { PromocodesService } from '../services/promocodes.service';
import { RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-promocodes',
  standalone: true,
  imports: [RouterLink,CommonModule,],
  templateUrl: './promocodes.component.html',
  styleUrl: './promocodes.component.scss'
})
export class PromocodesComponent implements OnInit,OnDestroy{
  subscription: any;
  promoCodes: any[] = [];
  pagination: any;
  page: number = 1;
  search: string = '';

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _PromocodesService: PromocodesService) { }

  loadPromoCodes() {
    this.subscription = this._PromocodesService.getAllPromoCodes(20, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.promoCodes = res.data;
        this.pagination = res.pagination;
      }
    })
    // console.log(this.promoCodes.values());
  }

  deletePromoCode(categoryId: string) {
    this._PromocodesService.deletePromoCode(categoryId).subscribe({
      next: (res) => {
        this.loadPromoCodes();
        alert('Promo Code has been Deleted successfully')
      }
    })
  }
  changeNumberOfPage(page: number) {
    this.page = page;
    this.loadPromoCodes();
  }

  searchData(data: string) {
    this.search = data;
    this.loadPromoCodes()
  }
  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
    this.loadPromoCodes();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe() 

  }
}
