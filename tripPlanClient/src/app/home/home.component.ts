import { Component, OnInit } from '@angular/core';
// import { SearchPipe } from '../pipes/search.pipe';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import {Pipe} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  city;

  constructor(
    private user: UserService,
    private router: Router

  ) { }

  ngOnInit() {
  }


  goToSearch(){
    console.log(this.city)
    this.router.navigate([`/city`], { queryParams: { name: this.city }})
  }



}
