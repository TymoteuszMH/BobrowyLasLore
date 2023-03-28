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
  
  
  constructor(
    private service: SheredService,
    private router: Router,
    protected validation: ValidationService,
  ){}



  userid=0;
  username="";
  password="";
  form="Sign up";
  signup=false;
  acc_created=false;
  err=false;
  users: any = [];

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe(data=>{
      this.users = data;
    }) 
  }

  ChangeForm(){
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

  SignIn(){
    this.acc_created = false;
    var val = { UserId: this.userid,
          Username: this.username,
          Password: this.password}
    var logged = this.validation.ValidateUser(val, true, this.users);
    if(logged){
      localStorage.setItem('logged', '1');
      this.router.resetConfig(site);
      this.router.navigate([ '/' ]);
      window.location.reload();
    }else{
      this.err=true;
    }
  }

  SignUp(){
    var val = { Username: this.username,
          Password: this.password}
    var signup_val = this.validation.ValidateUser(val, false, this.users);
    if(signup_val){
      this.service.addUser(val).subscribe()
      this.acc_created=true;
      this.ChangeForm()
    }else{
      this.err=true;
    }
  }
}
