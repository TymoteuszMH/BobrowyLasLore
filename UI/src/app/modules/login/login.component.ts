import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { site } from 'src/app/app-routing.module';
import { ValidationService } from '../helpers/validation.service';
import { SheredService } from '../helpers/shered.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userid=0;
  username="";
  password="";
  form="Sign up";
  signup=false;
  acc_created=false;
  err=false;
  users: any = [];

  constructor(
    private service: SheredService,
    private router: Router,
    protected validation: ValidationService,
  ){}

  ngOnInit(){
    this.getUsers();
  }
  //getting all user to check later if form data is correct
  getUsers(){
    this.service.getUsers().subscribe(data=>{
      this.users = data;
    }) 
  }
  //chenging type of form 
  changeForm(){
    this.username="";
    this.password="";
    if(this.signup){
      this.form="Sign up";
      this.err=false;
      this.signup=false;
    }else{
      this.form="Sign in";
      this.err=false;
      this.signup=true;
    }
  }
  //sign in method, getting data from fields and validating them, if data is correct, router changes to site routes and window is moving to main site
  signIn(){
    this.acc_created = false;
    var val = { UserId: this.userid,
          Username: this.username,
          Password: this.password}
    var logged = this.validation.validateUser(val, true, this.users);
    if(logged){
      localStorage.setItem('logged', '1');
      this.router.resetConfig(site);
      this.router.navigate([ '/' ]);
      window.location.reload();
    }else{
      this.err=true;
    }
  }
  //sign up method, validating data from form, and if everything is correct, adding user and changing to sign in form
  signUp(){
    var val = { Username: this.username,
          Password: this.password}
    var signup_val = this.validation.validateUser(val, false, this.users);
    if(signup_val){
      this.service.addUser(val).subscribe()
      this.acc_created=true;
      this.changeForm()
    }else{
      this.err=true;
    }
  }
}
