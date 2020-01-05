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

  public updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: user.isAdmin || false
    };
    localStorage.setItem('user', user.uid);
    return userRef.set(data, {merge: true});

  }

  public updateIfExists(user) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    if (userRef.get().subscribe(data => {
      console.log(data);
      if (!data.exists) {
        this.updateUserData(user);
      }

    })) {

    }
  }
}
