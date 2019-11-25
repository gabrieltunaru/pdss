import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {auth} from 'firebase';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {



  constructor(public fireStore: AngularFirestore,
              public fireAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone) {
  }
}
