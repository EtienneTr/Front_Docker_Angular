import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";

//user
import { User } from "../../models/user.model";

@Component({
  selector: 'admin',
  styleUrls: ['admin.component.css'],
  templateUrl: 'admin.component.html'
})
export class AdminComponent {
  error = "";
  success = "";
  users = null;
  notAssign = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private admin: User
  ){

    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    admin.token = loggedUser && loggedUser.token;
    admin.username = loggedUser && loggedUser.username;
    //get user
    this.userService.getAllUsers(admin.token)
      .subscribe(data => {
        if(data.status === 200) {
          this.users = data.users;
        }
        else {
          this.error = "Un problème est survenu lors de la communication avec le serveur. Veuillez rééssayer."
        }
      },
      error => {
        this.error = "Un problème est survenu lors de la communication avec le serveur. Veuillez rééssayer."
      });
  }

  onClickAction(action: string, userid: string){
      switch(action) {
        case "delete":
          this.userService.deleteUser(userid, this.admin.token)
              .subscribe(result => {
                  if (result && result.status === 200) {
                    this.success = "L'action a bien été effectuée";
                    //refresh users
                    this.users = this.users.filter(e => e._id != userid);
                  }
                },
                error => {
                  this.error = "Action impossible";
                });
          break;
        case "pictures":
            this.router.navigate(['/picture', userid]);
          break;
      }
  }


}
