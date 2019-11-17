import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/core/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public credentials: any = {
    email: '',
    password: ''
  };

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    console.log(this.credentials);
    this.authService.signIn(this.credentials.email, this.credentials.password);
  }


}
