import { Component, OnInit, OnChanges } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {

agenda: any = {};
user: any = {};

  constructor(
    private session: SessionService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastsManager
    )
    {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getAgenda(params['agendaId']);
    });
}

  getAgenda(agendaId){
    this.userService.getAgenda(agendaId)
      .subscribe((agenda) => {
        this.agenda = agenda;
        console.log("agenda", this.agenda)
      });
  }

  removeAgenda(agendaId) {
    console.log("remove Request", this.agenda._id)
      this.userService.removeAgenda(this.agenda._id)
      .subscribe(() => {
            console.log("User agenda", this.agenda.user)
        this.toastr.success("You deleted the agenda")
        this.router.navigate(['users', this.agenda.user._id]);
      });
  }

}
