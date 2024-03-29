import { Component } from '@angular/core';
import { ValidationService } from '../helpers/validation.service';
import { SheredService } from '../helpers/shered.service';
import { ChangerouteService } from '../helpers/changeroute.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  userid=0;
  username="";
  password="";
  form="Sign up";
  signup=false;
  acc_created=false;
  err=false;
  res: any;

  constructor(
    private service: SheredService,
    protected validation: ValidationService,
    private changeroute: ChangerouteService
  ){}

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
  //data is check via sending post to api, and returning logged or err, then if data is correct, id is taken from api
  signIn(){
    this.acc_created = false;
    this.err=false;
    var val = {Username: this.username,
              Password: this.password}
    var logged = this.validation.validateUser(val, true);
    if(logged){
      this.service.login(val).subscribe(res=>{
        if(res == "logged"){
          logged = true;
          localStorage.setItem('username', val.Username);
          localStorage.setItem('password', val.Password);
          this.service.getUserId(val.Username).subscribe(res=>{
            localStorage.setItem('userid', res.toString());
          })
          localStorage.setItem('logged', '1');
          this.changeroute.change(true)
        }else{
          this.err=true;
        }
      })
    }else{
      this.err=true;
    }
  }
  //sign up method, validating data from form, and if everything is correct, adding user and changing to sign in form
  signUp(){
    this.err=false;
    var val = { Username: this.username,
                Password: this.password}
    var signup_val = this.validation.validateUser(val, false);
    if(signup_val){
      this.service.addUser(val).subscribe(res=>{
        if(res == 'added'){
          this.acc_created=true;
          this.changeForm()
        }else{
          this.err=true;
        }
      })
    }else{
      this.err=true;
    }
  }
}
