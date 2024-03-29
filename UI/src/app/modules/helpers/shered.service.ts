import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SheredService {
  readonly APIUrl = "https://timmhus104.pythonanywhere.com";
  readonly PhotoUrl = "https://timmhus104.pythonanywhere.com/media/";

  constructor(private http:HttpClient) { }

  //all api functions
  login(val:any){
    return this.http.post(this.APIUrl + '/login/', val)
  }

  getUserId(username:any):Observable<any>{
    return this.http.get<any>(this.APIUrl + '/users/' + username)
  }

  addUser(val:any){
    return this.http.post(this.APIUrl + '/users/', val)
  }

  updateUser(val:any, login:string){
    return this.http.put(this.APIUrl + '/users/' + login, val)
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
  logged:any;
  userId:any;
  userName: any;
  password: any;
  Check(){
    this.logged = localStorage.getItem('logged');
    this.userId = localStorage.getItem('userid');
    this.userName = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
  }
}
