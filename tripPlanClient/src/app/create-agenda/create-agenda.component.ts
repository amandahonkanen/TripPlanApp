import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SessionService } from "../session.service";

@Component({
  selector: 'app-create-agenda',
  templateUrl: './create-agenda.component.html',
  styleUrls: ['./create-agenda.component.css']
})
export class CreateAgendaComponent implements OnInit {
    traveler: Object = {};
    request: Object={};
    value= '';
    numberValue;

    currentUser;


    constructor(
      private router: Router,
      private session: SessionService,
      private route: ActivatedRoute,
      private userService: UserService
      ) {

        this.currentUser =  this.session.currentUser || {}

     }

    ngOnInit() {
      this.traveler = this.session.getTraveller();
      console.log("Traveler from usa", this.traveler);
      this.request = this.session.getRequest();
      console.log("Request from usa", this.request);
    }


    public isCollapsed:boolean = false;

       public collapsed(event:any):void {
        //  console.log(event);
       }

       public expanded(event:any):void {
        //  console.log(event);
       }

       onEnter(value: string) {

         this.value = value;
        console.log(this.value);
        this.numberValue = Number(value);
        var items = [];
        for(var i = 1; i <= this.numberValue; i++){
          items.push(i);
          console.log(items);
        }
        return items;

      }

    }
