import {Component, OnInit} from '@angular/core';
import {ElectionsService} from '../../services/elections.service';
import {Election} from '../../models/Election';
import {User} from '../../models/User';

@Component({
  selector: 'app-election-create',
  templateUrl: './election-create.component.html',
  styleUrls: ['./election-create.component.scss']
})
export class ElectionCreateComponent implements OnInit {

  public election = {type: 'election', title: '', description: '', isReferendum: false, yes: 0, no: 0};

  constructor(private electionsService: ElectionsService) {
  }

  ngOnInit() {
  }

  create() {
    const election: Election = {
      ...this.election,
      isActive: false,
      isClosed: false,
      candidates: []
    };
    this.electionsService.createElection(election);
  }

}
