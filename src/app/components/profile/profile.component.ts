import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/core/profile.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {AuthService} from '../../services/core/auth.service';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {finalize, map} from 'rxjs/operators';
import * as firebase from 'firebase';
import {User} from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public changingImage: boolean;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  photoID: string;
  downloadURL: string;
  currentData = {} as User;

  constructor(private afStorage: AngularFireStorage, private fireStore: AngularFirestore, private userP: ProfileService) {
    const uid = localStorage.getItem('user');
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${uid}`);
    userRef.get().subscribe(el => {
      this.currentData = el.data() as User;
    });
  }


  ngOnInit() {
  }

  public changingImageClick() {
    this.changingImage = true;
  }

  public saveNewImage() {
    this.changingImage = false;
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.photoID = id;
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    // this.photoService.changePhoto('smt');
    this.task.snapshotChanges().pipe(
      finalize(() => {
          this.afStorage.ref(id).getDownloadURL()
            .subscribe(url => {
                this.downloadURL = url;
                this.changePhotoURL(this.downloadURL);
              }
            );
        }
      )
    )
      .subscribe();
  }

  changePhotoURL(url) {
    const uid = localStorage.getItem('user');
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${uid}`);
    userRef.get().subscribe(el => {
      this.currentData.photoURL = url;
      this.userP.updateUserData(this.currentData);
    });
  }

  saveInfo() {
    this.userP.updateUserData(this.currentData);
  }
}
