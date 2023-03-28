import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post';
import { IUser } from '../interfaces/user';
import { CheckService } from './check.service';
import { SheredService } from './shered.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  err_mes = "";
  users: IUser[] = [];
  posts: IPost[] = [];

  constructor(
      private check: CheckService,
      private service: SheredService
  ){}




  
  ValidateUser(val: any, signin: boolean, users:any){
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
    else if (val.Password.length < 8 && !signin){
      this.err_mes="Password can't be shorter than 8 characters!";
      return false;
    }
    if(signin){
      this.err_mes="Incorrect username or password!";
      return this.check.SignInCheck(val, users);
    }else{
      this.err_mes="User already exist!";
      return this.check.SignUpCheck(val, users);
    }
  }

  ValidatePost(val: any, edit:any=false, posts:any){
    if(val.PostTitle=="" || val.PostContent=="" || val.PostPhoto==""){
      this.err_mes="Fill in the fields!";
      return false;
    }
    if(edit){
      return true
    }else{
      this.err_mes="Post already exist!";
      return this.check.TitleCheck(val, posts)
    }
  }
}