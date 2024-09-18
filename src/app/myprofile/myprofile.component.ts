import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { GlobalService } from '../services/global.service';
import { MyprofileService } from '../services/myprofile.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent implements OnDestroy, OnInit {
  currentPasswordError: string = '';
  passwordError: string = '';
  userProfileImage: string = '';
  subscription: any;
  informationError: string = '';
  user: any = {};
  ////////////////////////////
  name: string = '';
  imageFile: any;

  getName(name: string) {
    this.name = name;
  }
  getFile(event: any) {
    const image = event.target.files[0];
    if (image)
      this.imageFile = image;
  }

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  constructor(private _AuthService: AuthenaticationsService, private _MyprofileService: MyprofileService,
    private _GlobalService: GlobalService) { }

  changeUserPassword(formData: FormGroup) {
    this._MyprofileService.changeUserPassword(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveLoggedInUser();
        alert('Password has been Changed')
      }, error: (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'currentPassword')
            this.currentPasswordError = error.msg
          else if (error.path === 'password')
            this.passwordError = error.msg
        })
      }
    })
  }

  updateUserData() {
    const formData = new FormData();
    formData.append('name', this.name);
    if (this.imageFile)
      formData.append('profileImage', this.imageFile);
    this._MyprofileService.updateLoggedInUser(formData).subscribe({
      next: (res) => {
        this.loadUSer();
        alert('User Data has been updated Successfully')
      }
    })
  }

  loadUSer() {
    this.subscription = this._MyprofileService.getUser().subscribe({
      next: (res) => {
        this.user = res.data;
      }
    })
  }

  ngOnInit(): void {
    // this._AuthService.checkToken();
    this.userProfileImage = this._MyprofileService.userProfileImage;
    this.loadUSer();
  };
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };
}
