import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
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