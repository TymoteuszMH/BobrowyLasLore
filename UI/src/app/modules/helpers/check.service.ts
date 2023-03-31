import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  //checking if username exists, if yes, it returns false, if not then true
  SignUpCheck(val:any, users:any){
      var check = true;
      users.forEach((element: any) => {
          if(val.Username == element.Username){
          check = false;
          }
      });
      return check;
  }

  //checking if user exists, if password and username are correct, user is logged in, if not, it retruns false
  SignInCheck(val:any, users:any){
    var check = false;
    users.forEach((element: any) => {
    if(val.Username == element.Username && val.Password == element.Password){
        localStorage.setItem('userid', element.UserId);
        localStorage.setItem('username', element.Username);
        localStorage.setItem('password', element.Password);
        check = true;
    }
    });
    return check;
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