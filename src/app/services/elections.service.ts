import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {Election} from '../models/Election';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {
  elections: AngularFirestoreCollection<Election>;
  private electionDoc: AngularFirestoreDocument<Election>;

  constructor(private db: AngularFirestore) {
    this.elections = db.collection<Election>('/elections');
  }

  public createElection(election) {
    this.elections.add(election);
  }

  public getElections() {
    return this.elections.get();
  }

  public switchActive(election: Election) {
    this.elections.doc(election.id).update({isActive: election.isActive});
    // this.elections.doc(election.id).get().subscribe(el => console.log(el.data()));
  }

}
