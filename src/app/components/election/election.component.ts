import {Component, Input, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {ElectionsService} from '../../services/elections.service';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {AuthService} from '../../services/core/auth.service';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  @Input() election: Election;
  @Input() user: User;

  private isComponentCandidate: boolean;
  private isAlreadyCandidate;

  constructor(public electionsService: ElectionsService,
              private authService: AuthService,
              private router: Router) {
    this.isComponentCandidate = router.url === '/candidate';
  }

  ngOnInit() {
    console.log(this.election,this.user)
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
