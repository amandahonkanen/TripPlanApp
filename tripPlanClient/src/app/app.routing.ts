import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SessionService } from './session.service';
import { UserService } from './user.service';
import { SearchPipe } from './pipes/search.pipe';
import { ProfileComponent } from './profile/profile.component';

import { EditComponent } from './edit/edit.component';

import { UserlistComponent } from './userlist/userlist.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile/:id', component: ProfileComponent,
        children: [
        { path: 'edit', component: EditComponent }
      ]
  },
    { path: 'signup', component: SignupComponent },
    { path: 'city', component: UserlistComponent},
    { path: '**', redirectTo: '' }
];
