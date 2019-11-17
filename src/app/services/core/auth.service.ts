import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {auth} from 'firebase';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser;
  public isLoggedIn = false;


  constructor(public fireStore: AngularFirestore,
              public fireAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone) {
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

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, {merge: true});

  }

  async socialAuth(provider: auth.AuthProvider) {
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
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
        this.updateUserData(result.user);
        this.isLoggedIn = true;
        this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public getCurrentUser() {
    return this.fireAuth.user;
  }

  public signOut() {
    // const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);

    this.fireAuth.auth.signOut();
    this.isLoggedIn = false;
    console.log(this.fireAuth.user);

    // userRef.delete();
  }
}
