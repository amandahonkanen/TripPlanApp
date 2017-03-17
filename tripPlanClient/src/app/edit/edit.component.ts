import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {

  originalUser: any;
  editUser: Object = {};
  currentUser: Object = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router

  ) {

      this.editUser = localStorage.getItem("user");
      let userFromLocal = localStorage.getItem("user")
      this.currentUser = JSON.parse(userFromLocal);
      console.log("user", this.currentUser)
   }

  ngOnInit() {

    let paramId;
    this.route.params.subscribe(params =>{
      paramId = params['id'];
      this.userService.get(paramId)
        .subscribe((user)=>{
          console.log("user.city", user)
          this.originalUser = user;
          // console.log("user", user);
          this.editUser = {
            id: this.originalUser._id,
            username: this.originalUser.username,
            name: this.originalUser.name,
            role: this.originalUser.role,
            password: this.originalUser.password,
            age: this.originalUser.age,
            interests: this.originalUser.interests,
            description: this.originalUser.description,
            languages: this.originalUser.languages,
            city: this.originalUser.city
          };
        });
    });


    }

  save() {
    // console.log(this.editUser);
    // console.log("EdiUser ", this.editUser);
    // console.log("edit user city: ", this.editUser);
    // console.log("original user: ", this.originalUser)
    let user_id = this.originalUser._id;
    this.userService.edit(this.editUser).subscribe((user) =>{
      console.log(user)
      localStorage.removeItem("user")
      localStorage.setItem("user", JSON.stringify(user))
      this.router.navigate(['users', user_id])
    });
  }

}
