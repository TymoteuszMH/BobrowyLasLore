import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SheredService {
  readonly APIUrl = "http://127.0.0.1:8000";
  readonly PhotoUrl = "http://127.0.0.1:8000/media";

  constructor(private http:HttpClient) { }

  //all api functions
  Login(val:any){
    return this.http.post(this.APIUrl + '/login/', val)
  }

  addUser(val:any){
    return this.http.post(this.APIUrl + '/users/', val)
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl + '/users/', val)
  }

  getPosts():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/posts/')
  }
  
  getPostbyType(type:number):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/posts/' +  type)
  }

  getPost(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/post/' + id)
  }

  addPosts(val:any){
    return this.http.post(this.APIUrl + '/posts/', val)
  }

  updatePosts(val:any){
    return this.http.put(this.APIUrl + '/posts/', val)
  }

  deletePost(id:any){
    return this.http.delete(this.APIUrl + '/post/' + id)
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl + '/saveFiles/', val)
  }

}

//place to store data of logged user
export class LoginData{
  public logged:any = localStorage.getItem('logged');
  public userId:any = localStorage.getItem('userid');
  public userName: any = localStorage.getItem('username');
  public password: any = localStorage.getItem('password');
}
