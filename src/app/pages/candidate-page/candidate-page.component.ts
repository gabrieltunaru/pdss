import {Component, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {ElectionsService} from '../../services/elections.service';
import {User} from '../../models/User';
import {AuthService} from '../../services/core/auth.service';

@Component({
  selector: 'app-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss']
})
export class CandidatePageComponent implements OnInit {

  public elections: Election[];
  public user: User;

  constructor(private electionsService: ElectionsService,
              private authService: AuthService) {
    electionsService.getElections()
      .subscribe(snapshot => {
          this.elections = snapshot.docs.filter(election => !election.data().isClosed).map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {...data, id} as Election;
          });
        }
      );
    authService.getCurrentUser().subscribe(snapshot => {
      this.user = snapshot.data() as User;
    });
  }

  ngOnInit() {
  }

  onClick() {
    // this.electionsService.addCandidate(this.user);
  }

}
