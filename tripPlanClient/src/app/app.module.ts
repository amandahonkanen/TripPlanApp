import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap';
import { RouterModule } from "@angular/router";
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { SessionService } from './session.service';
import { UserService } from './user.service';
import { BookingService } from './booking.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { FileSelectDirective } from "ng2-file-upload";
import { UserlistComponent } from './userlist/userlist.component';
import { SearchPipe } from './pipes/search.pipe';

import { ExpertDetailsComponent } from './expert-details/expert-details.component';
import { RequestComponent } from './request/request.component';
import { RequestConfirmComponent } from './request-confirm/request-confirm.component';
import { AvatarComponent } from './avatar/avatar.component';
import { AgendaComponent } from './agenda/agenda.component';
import { CreateAgendaComponent } from './create-agenda/create-agenda.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { ToastModule} from 'ng2-toastr/ng2-toastr';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    EditComponent,
    FileSelectDirective,
    UserlistComponent,
    SearchPipe,
    ExpertDetailsComponent,
    RequestComponent,
    RequestConfirmComponent,
    AvatarComponent,
    AgendaComponent,
    CreateAgendaComponent,
    AgendaFormComponent

],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [SessionService, UserService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
