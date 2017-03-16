import { Component, ViewContainerRef } from '@angular/core';
import { SessionService } from './session.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private session: SessionService,
    public toastr: ToastsManager,
    vRef: ViewContainerRef
  ){
    this.toastr.setRootViewContainerRef(vRef)

    if(localStorage.getItem("token")){
      this.session.sendToken()
      // .map((res)=> res.json())
      // .catch((err) => Observable.throw(err));
    }
  }



}
