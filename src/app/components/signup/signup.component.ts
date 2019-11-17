import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public credentials: any = {
    email: '',
    password: '',
    password2: '',
  };

  constructor(public authService: AuthService,
              public router: Router) {
  }

  ngOnInit() {
  }

  login() {
    if (this.credentials.password === this.credentials.password2) {
      this.authService.signUp(this.credentials.email, this.credentials.password);
    }
  }

}
