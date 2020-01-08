import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import {AuthComponent} from './pages/auth/auth.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ElectionCreateComponent} from './pages/election-create/election-create.component';
import {ElectionsAdminComponent} from './pages/elections-admin/elections-admin.component';
import {CandidatePageComponent} from './pages/candidate-page/candidate-page.component';
import {ElectionsListPageComponent} from './pages/elections-list-page/elections-list-page.component';
import {ElectionToVoteComponent} from './components/election-to-vote/election-to-vote.component';
import {ElectionVoteComponent} from './pages/election-vote/election-vote.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'create-election', component: ElectionCreateComponent},
  {path: 'administrate-elections', component: ElectionsAdminComponent},
  {path: 'candidate', component: CandidatePageComponent},
  {path: 'elections', component: ElectionsListPageComponent},
  {path: 'election/:id', component: ElectionVoteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
