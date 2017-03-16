import { Component, OnInit, OnChanges } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {

agenda: any = {};

  constructor(
    private session: SessionService,
    private user: UserService,
    private router: Router,
    private route: ActivatedRoute,
    )
    {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getAgenda(params['agendaId']);
    });
}

getAgenda(agendaId){
  this.user.getAgenda(agendaId)
    .subscribe((agenda) => {
      this.agenda = agenda;
      console.log("agenda", this.agenda)
    });
}

}
