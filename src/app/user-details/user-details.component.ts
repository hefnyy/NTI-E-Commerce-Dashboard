import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenaticationsService } from '../services/authenatications.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  userProfileImage = 'http://localhost:3000/users/';
  subscription: any;
  user: any = {};
  userImage: string = '';
  userImageFile: any;
  userName: string = '';
  id: string = '';
  changePasswordError: string = '';

  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });
  getFile(event: any) {
    const image = event.target.files[0];
    if (image) { this.userImageFile = image };
  }
  constructor(private _AuthenaticationsService: AuthenaticationsService, private _UserService: UsersService,
    private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }

  loadUser(userId: string) {
    this.subscription = this._UserService.getUser(userId).subscribe({
      next: (res) => {
        this.user = res.data;
      }
    })
  }


  updateUserInfo(userId: string) {
    const formData = new FormData();
    formData.append('name', this.userName);
    if (this.userImageFile) { formData.append('image', this.userImageFile) };
    this._UserService.updateUser(userId, formData).subscribe({
      next: (res) => {
        this.loadUser(userId);
        alert('User Information has been Updated Successfully');
      },
      error: (err) => { }
    })
  }
  getName(name: string) {
    this.userName = name;
  }

  changeUserPassword(userId: string, formData: FormGroup) {
    this._UserService.updateUserPassword(userId, formData.value).subscribe({
      next: (res) => {
        alert('User Password has been Changed Successfully');
        this._Router.navigate(['/users']);
      },
      error: (err) => {
        this.changePasswordError = err.error.errors[0].msg
      }
    })
  }

  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.loadUser(this.id);
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
