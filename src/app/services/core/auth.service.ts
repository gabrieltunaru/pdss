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
        this.signIn(email, password);
      })
      .catch(err => {
        console.error(err);
      });
  }


  async socialAuth(provider: auth.AuthProvider) {
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    this.profileService.updateIfExists(credential.user);
    this.isLoggedIn = true;
    this.router.navigate(['']);
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
        this.profileService.updateIfExists(result.user, true);
        this.isLoggedIn = true;
        setTimeout(() => window.location.reload(), 1000);

      })
      .catch(err => {
        console.error(err);
      });
  }


  public signOut() {

    this.fireAuth.auth.signOut();
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['auth']);
    setTimeout(() => window.location.reload(), 1000);

  }

  public getCurrentUser() {

    const uid = localStorage.getItem('user');
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${uid}`);
    return userRef.get();
  }

  getFirebaseUser() {
    return this.fireAuth.user;
  }
}
