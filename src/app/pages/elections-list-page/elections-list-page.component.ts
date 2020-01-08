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
      .subscribe(snapshot => {
          this.elections = snapshot.docs
            .map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {...data, id} as Election;
          });
        }
      );
  }

  ngOnInit() {
  }

  goToElection(election: Election) {
    this.router.navigate(['election', election.id], {state: {election}});
  }

}
