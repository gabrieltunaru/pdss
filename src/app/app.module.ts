import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatSelectModule, MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import {AuthComponent} from './pages/auth/auth.component';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/core/auth.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {firebaseConfig} from '../environments/environment';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {MenuComponent} from './components/menu/menu.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { AngularFireStorageModule} from '@angular/fire/storage';
import {ElectionsComponent} from './pages/elections/elections.component';
import {ElectionCreateComponent} from './pages/election-create/election-create.component';
import { ElectionsAdminComponent } from './pages/elections-admin/elections-admin.component';
import { ElectionComponent } from './components/election/election.component';
import { CandidatePageComponent } from './pages/candidate-page/candidate-page.component';
import { ElectionsListPageComponent } from './pages/elections-list-page/elections-list-page.component';
import { ElectionToVoteComponent } from './components/election-to-vote/election-to-vote.component';
import { ElectionVoteComponent } from './pages/election-vote/election-vote.component';
import { ResultsComponent } from './pages/results/results.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    MenuComponent,
    ProfileComponent,
    ProfileComponent,
    ElectionsComponent,
    ElectionCreateComponent,
    ElectionsAdminComponent,
    ElectionComponent,
    CandidatePageComponent,
    ElectionsListPageComponent,
    ElectionToVoteComponent,
    ElectionVoteComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    FlexModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatToolbarModule,
    ImageCropperModule,
    AngularFireStorageModule,
    MatSelectModule,
    MatSlideToggleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
