import {Component, Input, OnInit} from '@angular/core';
import {Election} from '../../models/Election';
import {ElectionsService} from '../../services/elections.service';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  @Input() election: Election;

  constructor(public electionsService: ElectionsService) {
  }

  ngOnInit() {
    console.log(this.election);
  }

  public switchActive() {
    this.election.isActive = !this.election.isActive;
    this.electionsService.switchActive(this.election);
  }

}
