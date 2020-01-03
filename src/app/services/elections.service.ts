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

}
