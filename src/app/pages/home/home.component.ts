import {Component, OnInit} from '@angular/core';

//service pour login
import { AuthService } from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'home',
  styleUrls: ['home.component.css'],
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public token: string;
  public username: string;
  success = null;
  error = null;
  user = null;

  constructor(private authservice: AuthService, public userService: UserService){
    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    this.user = new User();
    this.user.token = loggedUser && loggedUser.token;
    this.user.username = loggedUser && loggedUser.username;
    this.user.role = loggedUser && loggedUser.role;

    //get user
    this.userService.getUser(this.user.username, this.user.token)
      .subscribe(data => {
        this.user.images = data.user.images;
      });

  }

  onClickAction(imageid){
    this.userService.deleteImage(imageid, this.user.token)
      .subscribe(result => {
          if(result && result.status === 200){
            this.success = "L'action a bien été effectué";
            this.user.images = this.user.images.filter(e => e._id != imageid);
          } else {
            this.error = "Impossible d'effectuer cette action";
          }
        },
        error =>{
          this.error = "Impossible d'effectuer cette action";
        })
  }
}
