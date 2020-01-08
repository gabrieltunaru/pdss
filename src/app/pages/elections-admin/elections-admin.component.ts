import {Component, OnInit} from '@angular/core';
import {ElectionsService} from '../../services/elections.service';
import {Election} from '../../models/Election';

@Component({
  selector: 'app-elections-admin',
  templateUrl: './elections-admin.component.html',
  styleUrls: ['./elections-admin.component.scss']
})
export class ElectionsAdminComponent implements OnInit {

  public elections: Election[];

  constructor(private electionsService: ElectionsService) {
    electionsService.getElections()
      .subscribe(elections => {
          this.elections = elections;
        }
      );
  }

  ngOnInit() {
  }

  onClick() {
  }

}
