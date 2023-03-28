import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  SignUpCheck(val:any, users:any){
      var check = true;
      users.forEach((element: any) => {
          if(val.Username == element.Username){
          check = false;
          }
      });
      return check;
  }

  SignInCheck(val:any, users:any){
    var check = false;
    users.forEach((element: any) => {
    if(val.Username == element.Username && val.Password == element.Password){
        localStorage.setItem('userid', element.UserId);
        localStorage.setItem('username', element.Username);
        localStorage.setItem('password', element.Password);
        check = true;
    }else if(val.username == element.Username){
        check = false;
    }
    });
    return check;
  }

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