import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { SearchPipe } from '../pipes/search.pipe';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {

  users;
  city: Array<String>=[];


  constructor(
    private user: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search(params["name"])
    });
  }



  search(cityName) {
    this.user.search(cityName)
      .subscribe((users) => {
        this.users = users
      });
}
}
