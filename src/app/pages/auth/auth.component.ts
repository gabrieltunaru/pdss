import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/core/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  private useLoginComponent = false;
  private messages = {
    login: 'Don\'t have an account? Click here:',
    register: 'Already have an account? Click here:'
  };

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  switchComponent() {
    this.useLoginComponent = !this.useLoginComponent;
  }

  googleAuth() {
    this.authService.googleAuth();
  }

}
