import { Component } from '@angular/core';
import { SessionService } from './session.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private session: SessionService){

    if(localStorage.getItem("token")){
      this.session.sendToken()
      // .map((res)=> res.json())
      // .catch((err) => Observable.throw(err));
    }
  }



}
