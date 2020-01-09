import {Component, Input, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {ActivatedRoute, Router} from '@angular/router';
import {ElectionsService} from '../../services/elections.service';
import {Candidate} from '../../models/Candidate';
import {AuthService} from '../../services/core/auth.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-election-vote',
  templateUrl: './election-vote.component.html',
  styleUrls: ['./election-vote.component.scss']
})
export class ElectionVoteComponent implements OnInit {

  public election: Election = {} as Election;
  public alreadyVoted = false;
  public totalVotes = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private electionService: ElectionsService,
              private authService: AuthService) {

    const id = this.route.snapshot.paramMap.get('id');
    this.electionService.getElection(id).subscribe(election => {
      this.election = election as Election;
      this.totalVotes = this.election.candidates.map(candidate => candidate.votes).reduce((acc, cur) => acc + cur);
      if (this.election.isClosed) {
        this.election.candidates.sort((a, b) => a.votes - b.votes);
      }
      this.authService.getCurrentUser().subscribe(ss => {
        const user = ss.data() as User;
        if (user.electionsVotedIn) {
          this.alreadyVoted = !!user.electionsVotedIn.find(electionId => electionId === this.election.id);
        }
      });
    });

  }

  ngOnInit() {
  }

  public vote(candiate: Candidate) {
    this.election.candidates.map(electionCandidate => {
      if (electionCandidate.user.uid === candiate.user.uid) {
        electionCandidate.votes++;
      }
    });
    this.electionService.vote(this.election);
  }

  public voteReferendum(option) {
    this.election[option]++;
    this.electionService.vote(this.election);
  }

}
