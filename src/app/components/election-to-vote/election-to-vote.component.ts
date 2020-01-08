import {Component, Input, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {User} from '../../models/User';
import {ElectionsService} from '../../services/elections.service';
import {AuthService} from '../../services/core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-election-to-vote',
  templateUrl: './election-to-vote.component.html',
  styleUrls: ['./election-to-vote.component.scss']
})
export class ElectionToVoteComponent implements OnInit {

  @Input() election: Election;
  @Input() user: User;

  public isComponentCandidate: boolean;
  public isAlreadyCandidate;

  constructor(public electionsService: ElectionsService,
              private authService: AuthService,
              private router: Router) {
    this.isComponentCandidate = router.url === '/candidate';
  }

  ngOnInit() {
    this.isAlreadyCandidate = this.election.candidates.find(candidate => candidate.user.uid === this.user.uid);
  }

  public switchActive() {
    if (!this.election.isClosed && this.election.isActive) {
      this.election.isClosed = true;
    }
    this.election.isActive = !this.election.isActive;
    this.electionsService.switchActive(this.election);
  }

  public candidate() {
    this.electionsService.addUserToElection(this.user, this.election);
    this.isAlreadyCandidate = true;
  }

}
