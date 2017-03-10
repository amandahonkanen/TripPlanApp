import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {

  uploader: FileUploader;

  originalUser: any;
  editUser: any = {};

  feedback: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {
    this.editUser = localStorage.getItem("user");
  }

  ngOnInit() {

    let paramId;



    this.route.params.subscribe(params =>{
      paramId = params['id'];

      this.uploader = new FileUploader({
        url:`http://localhost:3000/api/users/${paramId}`,
        method: 'PUT',
        // authToken: `JWT ${this.session.token}`
      });

      this.uploader.onSuccessItem = (item, response) => {
        console.log('Success', response)
        this.router.navigate(['users', paramId]);
      };

      this.uploader.onErrorItem = (item, response, status, headers) => {
        console.log('Error', response)
      };
    });

    this.userService.get(paramId)
      .subscribe((user)=>{
        this.editUser = {
          id: user._id,
          username: user.username,
          name: user.name,
          role: user.role,
          password: user.password,
          age: user.age,
          interests: user.interests,
          description: user.description,
          languages: user.languages,
          city: user.city,
          image: user.image
        };
      });
    }

  update() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('username', this.editUser.username);
      form.append('name', this.editUser.name);
      form.append('role', this.editUser.role);
      form.append('password', this.editUser.password);
      form.append('age', this.editUser.age);
      form.append('interests', this.editUser.interests);
      form.append('description', this.editUser.description);
      form.append('languages', this.editUser.languages);
      form.append('city', this.editUser.city);
    };

    this.uploader.uploadAll();

  }

}
