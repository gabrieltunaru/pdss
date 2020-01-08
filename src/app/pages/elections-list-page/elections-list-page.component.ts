import {Component, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {ElectionsService} from '../../services/elections.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-elections-list-page',
  templateUrl: './elections-list-page.component.html',
  styleUrls: ['./elections-list-page.component.scss']
})
export class ElectionsListPageComponent implements OnInit {

  public elections: Election[];

  constructor(private electionsService: ElectionsService,
              private router: Router) {
    electionsService.getElections()
      .subscribe(elections => {
          this.elections = elections.filter(election => election.isActive && !election.isClosed);
        }
      );
  }

  ngOnInit() {
  }

  goToElection(election: Election) {
    this.router.navigate(['election', election.id], {state: {election}});
  }

}
