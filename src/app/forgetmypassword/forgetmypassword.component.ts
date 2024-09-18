import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenaticationsService } from '../services/authenatications.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgetmypassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,],
  templateUrl: './forgetmypassword.component.html',
  styleUrl: './forgetmypassword.component.scss'
})
export class ForgetmypasswordComponent implements OnInit,OnDestroy {

  sendEmailFlag: boolean = false;
  verifyCodeFlag: boolean = false;
  progressBarWidth: string = '33%';
  sendEmailError: string = '';
  verifyCodeError: string = '';
  changePasswordError: string = '';

  sendEmailForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  verifyCodeForm = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
  })

  changePasswordForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])

  })



  constructor(private _AuthenaticationsServices: AuthenaticationsService, private _Router: Router) { }

  sendEmail(formData: FormGroup) {
    this._AuthenaticationsServices.sendEmail(formData.value).subscribe({
      next: (res) => {
        console.log(res.resetToken);
        localStorage.setItem('verify', res.resetToken);
        this.sendEmailFlag = true;
        alert('Reset Code sent');
        this.updateProgressBar(66);
      }, error: (err) => {
        this.sendEmailError = err.error.message;
      }
    })
  }

  verifyCode(formData: FormGroup) {
    this._AuthenaticationsServices.verifyCode(formData.value).subscribe({
      next: (res) => {
        console.log(formData.value);
        this.verifyCodeFlag = true;
        this.updateProgressBar(100);
      }, error: (err) => {
        this.verifyCodeError = err.error.message;
      }
    })
  }

  changePassword(formData: FormGroup) {
    this._AuthenaticationsServices.changePassword(formData.value).subscribe({
      next: (res) => {
        localStorage.removeItem('verify')
        this.sendEmailFlag = false;
        this.verifyCodeFlag = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        this.changePasswordError = err.error.errors[0].msg;
      }
    })
  }
  updateProgressBar(percentage: number) {
    this.progressBarWidth = `${percentage}%`;
  }

  ngOnInit(): void {

    
  }
  ngOnDestroy(): void {
    
  }
}
