import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

uploader: FileUploader;


paramId;
feedback: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.paramId = params['id'];
});
      this.uploader = new FileUploader({
        url:`http://localhost:3000/api/users/${this.paramId}`
        // authToken: `JWT ${this.session.token}`
      });

      this.uploader.onSuccessItem = (item, response) => {
        console.log('Success', response)
        this.router.navigate(['users', this.paramId]);
      };

      this.uploader.onErrorItem = (item, response, status, headers) => {
        console.log('Error', response)
      };

  }

  addAvatar(){

    this.uploader.onBuildItemForm = (item, form) => {
    };

    this.uploader.uploadAll();

  }

}
