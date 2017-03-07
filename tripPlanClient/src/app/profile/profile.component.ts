import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: Object;

  constructor(private session: SessionService) {

    this.currentUser = this.session.currentUser || {}

   }

  ngOnInit() {

  }

}
