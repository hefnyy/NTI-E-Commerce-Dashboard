import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenaticationsService } from '../services/authenatications.service';
import { UsersService } from '../services/users.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss'
})
export class AddUsersComponent implements OnInit,OnDestroy {

  userEmailError:string='';
  userPasswordError: string = '';

  userForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    role: new FormControl(null, [Validators.required]),
  });

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _UsersService:UsersService, private _Router:Router){}

  createUser(formData:FormGroup){
    this._UsersService.createUser(formData.value).subscribe({
      next: (res) => {
        alert('User has been Created Successfully');
        this._Router.navigate(['/users']);
      }
      ,error: (err) => {
          err.error.errors.map((error: any) => {
          if (error.path === 'email') 
            this.userEmailError = error.msg ;
          if (error.path === 'password') 
            this.userPasswordError = error.msg ;
        })
      }
    })
  }

  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
  }
  ngOnDestroy(): void {
    
  }
}
