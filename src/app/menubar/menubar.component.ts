import { Component, OnInit } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent implements OnInit {
user:any;
  constructor(private _AuthenaticationsService:AuthenaticationsService, private _Router:Router){}

  logout(){
    this._AuthenaticationsService.logout();
    this._Router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.user = this._AuthenaticationsService.loggedInUser.getValue();
  }
}
