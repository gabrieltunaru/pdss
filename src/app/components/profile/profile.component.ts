import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/core/profile.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {AuthService} from '../../services/core/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public changingImage: boolean;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public savedImage: boolean;
  constructor() { }

  ngOnInit() {
  }
  public changingImageClick() {
    this.changingImage = true;
  }
  public saveNewImage() {
    this.changingImage = false;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
    this.savedImage = true;
  }
  loadImageFailed() {
    // show message
    this.savedImage = false;
  }
}
