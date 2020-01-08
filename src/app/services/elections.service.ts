import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {Election} from '../models/Election';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {AuthService} from './core/auth.service';
import {ProfileService} from './core/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {
  elections: AngularFirestoreCollection<Election>;
  private electionDoc: AngularFirestoreDocument<Election>;

  constructor(private db: AngularFirestore, private authService: AuthService, private profileService: ProfileService) {
    this.elections = db.collection<Election>('/elections');
  }

  public createElection(election) {
    this.elections.add(election);
  }

  public getElections() {
    return this.elections.get();
  }

  public switchActive(election: Election) {
    this.elections.doc(election.id).update({isActive: election.isActive, isClosed: election.isClosed});
    // this.elections.doc(election.id).get().subscribe(el => console.log(el.data()));
  }

  public addUserToElection(user: User, election: Election) {
    election.candidates.push({user, votes: 0});
    this.elections.doc(election.id).update(({candidates: election.candidates}));
  }

  public getElection(id: string) {
    return new Observable(subscriber =>
      this.db.doc(`elections/${id}`).get().subscribe(ss => {
        subscriber.next({...ss.data(), id: ss.id});
        subscriber.complete();
      }));
  }

  public vote(election: Election) {
    let changes = {};
    if (election.isReferendum) {
      changes = {candidates: election.candidates};
    } else {
      changes = {yes: election.yes, no: election.no};
    }
    this.elections.doc(election.id).update(changes);
    this.authService.getCurrentUser().subscribe(ss => {
      const user = ss.data() as User;
      console.log('user', user);
      user.electionsVotedIn.push(election.id);
      this.profileService.updateUserData(user);
    });
  }

}
