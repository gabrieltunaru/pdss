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
      .subscribe(snapshot => {
          this.elections = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {...data, id} as Election;
          });
        }
      );
  }

  ngOnInit() {
  }

  onClick() {
  }

}
