import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post';
import { IUser } from '../interfaces/user';
import { CheckService } from './check.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  err_mes = "";
  users: IUser[] = [];
  posts: IPost[] = [];

  constructor(
      private check: CheckService,
  ){}

  //validating user, checking if there any white spaces and if password is long enough
  validateUser(val: any, signin: boolean){
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
      //going to check if user exist on login in
      return true;
    }else{
      //going to check if user exist on sign up
      this.err_mes="User already exist!";
      return true;
    }
  }

  //validating post, chcecking if post fields are empty
  validatePost(val: any, posts:any){
    if(val.PostTitle=="" || val.PostContent=="" || val.PostPhoto==""){
      this.err_mes="Fill in the fields!";
      return false;
    }
    //going to check if post title already exist
    this.err_mes="Post already exist!";
    return this.check.TitleCheck(val, posts)
  }
}