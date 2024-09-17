import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { MenubarComponent } from "./menubar/menubar.component";
import { AuthenaticationsService } from './services/authenatications.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  title = 'dashboard';
  isLogin: boolean = false;

  constructor(private _AuthService: AuthenaticationsService) { }

  ngOnInit(): void {
    this._AuthService.loggedInUser.subscribe({
      next: () => {
        if (this._AuthService.loggedInUser.getValue() !== null)  
          this.isLogin = true; 
        else  
          this.isLogin = false; 
      }
    })
  }
}
