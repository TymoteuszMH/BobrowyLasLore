import { Injectable } from '@angular/core';
import { SheredService } from './shered.service';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  constructor(
    private service: SheredService
  ){}
  //checking if username exists, if yes, it returns false, if not then true
  SignUpCheck(val:any){
      var check = '';
      var logged = false;
      this.service.getLogin(val).subscribe(data=>{
        check = data;
        if(check == 'logged') logged = true;
      })
      return logged;
  }

  //checking if user exists, if password and username are correct, user is logged in, if not, it retruns false
  SignInCheck(val:any){
    var check = '';
    var logged = false;
    this.service.getLogin(val).subscribe(data=>{
      check = data;
      if(check == 'logged'){
        localStorage.setItem('userid', val.UserId);
        localStorage.setItem('username', val.Username);
        localStorage.setItem('password', val.Password);
        logged = true;
      } 
    })
    return logged;
  }

  //checking if title exist, so the title would not repeat
  TitleCheck(val:any, posts:any){
      var check = true;
      posts.forEach((element: any) => {
        if(val.postTitle == element.PostTitle){
          check = false;
        }
      });
      return check;
    }
}