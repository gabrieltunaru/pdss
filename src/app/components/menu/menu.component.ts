import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/core/auth.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isLoggedIn = false;
  public user: User = {} as User;

  constructor(public authService: AuthService) {
    const userId = localStorage.getItem('user');
    this.isLoggedIn = !!userId;
    authService.getCurrentUser().subscribe(ss => this.user = ss.data() as User);
  }

  ngOnInit() {
  }

}
