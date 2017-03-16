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
import { RequestConfirmComponent } from './request-confirm/request-confirm.component';

import { AvatarComponent} from './avatar/avatar.component';
import { AgendaComponent} from './agenda/agenda.component';
import { CreateAgendaComponent} from './create-agenda/create-agenda.component';




export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users/:id/edit', component: EditComponent },
    { path: 'users/:id/avatar', component: AvatarComponent },
    { path: 'users/:id', component: ProfileComponent},
    { path: 'agenda/:agendaId', component: AgendaComponent},
    { path: 'city/:id', component: ExpertDetailsComponent },
    { path: 'user/:id', component: ExpertDetailsComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'city', component: UserlistComponent},
    { path: 'booked', component: RequestComponent},
    { path: 'request/:requestId', component: RequestConfirmComponent},
    // { path: 'request/:requestId/', component: RequestConfirmComponent},

    { path: '**', redirectTo: '' }
];
