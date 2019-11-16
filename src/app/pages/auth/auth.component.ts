import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/core/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private credentials: any = {
    email: '',
    password: ''
  };

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    console.log(this.credentials);
    this.authService.signUp(this.credentials.email, this.credentials.password);
  }

}
