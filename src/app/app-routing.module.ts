import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import {AuthComponent} from './pages/auth/auth.component';
import {ProfileComponent} from './components/profile/profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: HomeComponent},
  {path: 'profile', component : ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
