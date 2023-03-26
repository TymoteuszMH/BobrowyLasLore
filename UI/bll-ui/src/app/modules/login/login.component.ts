import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SheredService } from 'src/app/shered.service';
import { site } from 'src/app/app-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(
    private service: SheredService,
    private router: Router
    ){}

  userid=0;
  username="";
  password="";
  form="Sign up";
  err_mes="";
  signup=false;
  acc_created=false;
  err=false;
  users:any=[];

  ngOnInit(){
    this.GetUsers();
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

  GetUsers(){
    this.service.getAllUsernames().subscribe(data=>{
      this.users = data;
    })
  }

  SignIn(){
    this.acc_created = false;
    var val = { UserId: this.userid,
          Username: this.username,
          Password: this.password}
    var logged = this.Validate(val, true);
    if(logged){
      localStorage.setItem('logged', '1');
      this.router.resetConfig(site);
      this.router.navigate([ '/' ]);
      window.location.reload();
    }else{
      this.err=true;
    }
  }

  SignInCheck(val:any){
    var check = false;
    this.users.forEach((element: any) => {
    if(val.Username == element.Username && val.Password == element.Password){
      localStorage.setItem('userid', element.UserId);
      localStorage.setItem('username', element.Username);
      localStorage.setItem('password', element.Password);
      check = true;
    }else if(val.username == element.Username){
      this.err_mes="Password incorrect!";
      this.err=true;
      check = false;
    }
    });
      return check;
  }

  SignUp(){
    var val = { Username: this.username,
          Password: this.password}
    var signup_val = this.Validate(val, false);
    if(signup_val){
      this.service.addUser(val).subscribe()
      this.acc_created=true;
      this.ChangeForm()
    }else{
      this.err=true;
    }
  }

  SignUpCheck(val:any){
    var check = true;
    this.users.forEach((element: any) => {
      if(val.Username == element.Username){
        check = false;
      }
    });
    return check;
  }

  Validate(val: any, signin: boolean){
    if(val.Username=="" || val.Password==""){
      this.err_mes="Fill in the fields!";
      return false;
    }
    else if(val.Username.indexOf(' ') > 0){
      this.err_mes="There can't be any spacies in username!";
      return false;
    }
    else if (val.Password.indexOf(' ') > 0){
      this.err_mes="There can't be any spacies in password!";
      return false;
    }
    else if (val.Password.length < 8){
      this.err_mes="Password can't be shorter than 8 characters!";
      return false;
    }
    if(signin){
      this.err_mes="Account doesn't exist!";
      return this.SignInCheck(val)
    }else{
      this.err_mes="User already exist!";
      return this.SignUpCheck(val)
    }
  }
}
