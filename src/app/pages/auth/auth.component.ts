import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
  }

  login() {
    console.log(this.credentials);
  }

}
