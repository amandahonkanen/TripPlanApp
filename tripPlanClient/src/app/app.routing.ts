import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SessionService } from './session.service';
import { UserService } from './user.service';
import { BookingService } from './booking.service';
import { SearchPipe } from './pipes/search.pipe';
import { ProfileComponent } from './profile/profile.component';

import { EditComponent } from './edit/edit.component';

import { UserlistComponent } from './userlist/userlist.component';
import { ExpertDetailsComponent } from './expert-details/expert-details.component';
import { RequestComponent } from './request/request.component';
import { RequestFormComponent } from './request-form/request-form.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users/:id/edit', component: EditComponent, canActivate: [SessionService] },
    { path: 'users/:id', component: ProfileComponent, canActivate: [SessionService]},
    { path: 'city/:id', component: ExpertDetailsComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'city', component: UserlistComponent},
    { path: 'request/:id', component: RequestComponent},
    { path: 'request', component: RequestFormComponent},
    { path: '**', redirectTo: '' }
];
