import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {auth} from 'firebase';
import {first, switchMap} from 'rxjs/operators';
import {User} from '../../models/User';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user: Observable<User>;

  constructor(public fireStore: AngularFirestore,
              public fireAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone) {
    this.user = this.fireAuth.authState.pipe(
      switchMap(user => {
          if (user) {
            return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }
      )
    );
  }

  public updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: user.isAdmin || false,
      electionsVotedIn: user.electionsVotedIn || []
    };
    return userRef.set(data, {merge: true});

  }

  public updateIfExists(user, forceUpdate?: boolean) {
    localStorage.setItem('user', user.uid);
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    userRef.get().subscribe(data => {
      if (!data.exists || forceUpdate) {
        this.updateUserData(user);
      }
      this.router.navigate(['']);
      // window.location.reload();
    });
  }
}
