import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/core/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isLoggedIn = false;

  constructor(public authService: AuthService) {
    const userId = localStorage.getItem('user');
    this.isLoggedIn = !!userId;
  }

  ngOnInit() {
  }

}
