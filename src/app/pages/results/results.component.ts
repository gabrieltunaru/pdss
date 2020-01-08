import {Component, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {ElectionsService} from '../../services/elections.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public elections: Election[];

  constructor(private electionsService: ElectionsService,
              private router: Router) {
    electionsService.getElections()
      .subscribe(elections => {
          this.elections = elections.filter(election => election.isClosed);
        }
      );
  }

  ngOnInit() {
  }

  goToElection(election: Election) {
    this.router.navigate(['election', election.id], {state: {election}});
  }
}
