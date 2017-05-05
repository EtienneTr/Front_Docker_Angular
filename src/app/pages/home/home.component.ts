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
export class HomeComponent implements OnInit{
  public token: string;
  public username: string;

  constructor(private authservice: AuthService, public userService: UserService, protected user: User){
    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    user.token = loggedUser && loggedUser.token;
    user.username = loggedUser && loggedUser.username;
    user.role = loggedUser && loggedUser.role;

    //get user
    this.userService.getUser(user.username, user.token)
      .subscribe(data => {
        this.user.images = data.user.images;
        console.log(data.user.images);
      });

  }

  ngOnInit(){

  }
}
