import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit,OnDestroy {
  subscription: any;
  users: any[] = [];
  pagination: any;
  page: number = 1;
  search: string = '';
  role:string ='admin';
  userImageDomain: string = 'http://localhost:3000/users/';
  userSubscription:any;
  user:any={};

  constructor(private _AuthenaticationsService: AuthenaticationsService, private _UsersService: UsersService) { }

  deleteUser(userId:string){
    this._UsersService.deleteUser(userId).subscribe({
      next: (res) => {
        this.loadUsers();
        alert('User has been Deleted Successfully')
      }
    })
  }

  filterUsers(filter: string) {
    this.role = filter;
    this.loadUsers()
  };

  changeUserActive(userId: string) {
    this.userSubscription = this._UsersService.getUser(userId).subscribe({
      next: (res) => {
        this.user = res.data
        this._UsersService.updateUser(userId, { active: !this.user.active }).subscribe({
          next: (res) => {
            this.loadUsers();
            alert('User Activation has Changed Successfully')
          }
        })
      }
    })
  }

  loadUsers(){
    this.subscription = this._UsersService.getAllUsers(undefined,this.page,'name',this.search,this.role).subscribe({
      next: (res) => {
        this.users=res.data;
        this.pagination = res.pagination;
      }
    })
  }

  changeNumberOfPage(page: number) {
    this.page = page;
    this.loadUsers();
  }

  searchData(data: string) {
    this.search = data;
    this.loadUsers()
  }
  


  ngOnInit(): void {
    this._AuthenaticationsService.checkToken();
    this.loadUsers();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.userSubscription) 
      this.userSubscription.unsubscribe();
  }
}
