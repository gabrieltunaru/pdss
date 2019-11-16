import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


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

  async googleAuth() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    console.log(credential.user);
  }
}
