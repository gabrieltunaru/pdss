import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {auth} from 'firebase';
import {first, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User} from '../../models/User';
import {ProfileService} from './profile.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  constructor(public fireStore: AngularFirestore,
              public fireAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone,
              public profileService: ProfileService) {
  }

  public signUp(email, password) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
        this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err);
      });
  }



  async socialAuth(provider: auth.AuthProvider) {
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    this.profileService.updateIfExists(credential.user);
    this.isLoggedIn = true;
    this.router.navigate(['']);
    console.log(credential.user);
  }

  async googleAuth() {
    this.socialAuth(new auth.GoogleAuthProvider());
  }

  async facebookAuth() {
    this.socialAuth(new auth.FacebookAuthProvider());
  }

  public signIn(email, password) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
        this.profileService.updateIfExists(result.user);
        this.isLoggedIn = true;
        this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err);
      });
  }



  public signOut() {
    // const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);

    this.fireAuth.auth.signOut();
    this.isLoggedIn = false;
    console.log(this.fireAuth.user);

    // userRef.delete();
  }
}
