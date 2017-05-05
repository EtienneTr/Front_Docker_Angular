import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";
//user
import { User } from "../../models/user.model";

@Component({
  selector: 'advisors',
  styleUrls: ['users.component.css'],
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit{
  error = "";
  success = "";

  user = null;

  constructor(
    private router: Router,
    public activRoute: ActivatedRoute,
    private userService: UserService,
    private admin: User
  ){

    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    admin.token = loggedUser && loggedUser.token;
    admin.username = loggedUser && loggedUser.username;
  }

  ngOnInit(){
    this.activRoute.params.subscribe(params => {
      let userID = params['userID'];
      this.userService.getUser(userID, this.admin.token)
        .subscribe(data => {
          this.user = data.user;
        });
    });
  }

  onClickAction(imageid){
    this.userService.deleteImage(imageid, this.admin.token)
      .subscribe(result => {
        if(result && result.status === 200){
          this.success = "L'action a bien été effectué";
          this.user.images = this.user.images.filter(e => e._id != imageid);
        }
      },
      error =>{
        this.error = "Impossible d'effectuer cette action";
      })
  }


}
