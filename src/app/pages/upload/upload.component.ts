import {Directive, Component, Inject, ElementRef, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3003/api/images';

//service pour login
import { UserService } from "../../services/user.service";
//user
import { User } from "../../models/user.model";

@Component({
  selector: 'upload',
  styleUrls: ['upload.component.css'],
  templateUrl: 'upload.component.html'
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  error = "";
  succesMsg = "";
  //edit bool
  //protected upfile : File[];

  public uploader: FileUploader = new FileUploader({
    url: URL
  });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private loginService: UserService,
              private user: User
  ){

    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    user.token = loggedUser && loggedUser.token;
    user.username = loggedUser && loggedUser.username;
    user.role = loggedUser && loggedUser.role;

    //get user
    this.loginService.getUser(user.username, user.token)
      .subscribe(data => {
        this.user.lastname = data.user.lastname;
        this.user.firstname = data.user.firstname;
        this.user.mail = data.user.mail;
      });

  }

  ngOnInit(){

    this.uploadForm = this.formBuilder.group({
      picture: ['', Validators.required]
    });

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };

    //token
    this.uploader.onBeforeUploadItem = () => {
      this.addFileTokenHeader();
    }
  }

  addFileTokenHeader() {
    this.uploader.setOptions({headers: [{name: 'x-access-token', value: this.user.token}]});
  }


  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  /*onChange(event) {
    var files = event.srcElement.files;
    this.upfile = files;
  }

  onUploadSubmit(){
    console.log(this.upfile);

    this.loginService.uploadImage(this.upfile, this.user.token)
      .subscribe(data => {
          if(data && data.status === 200) {
            this.succesMsg = "Image envoyée avec succès";

          } else {
            this.error = "Veuillez vérifier vos informations";
          }
        },
        error => {
          this.error = "Modification impossible.";
        });

  }*/

}
