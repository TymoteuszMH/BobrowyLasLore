import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SheredService {
  readonly APIUrl = "http://127.0.0.1:8000";
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http:HttpClient) { }

  getUser():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/users/')
  }

  addUser(val:any){
    return this.http.post(this.APIUrl + '/users/', val)
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl + '/users/', val)
  }

  deleteUser(val:any){
    return this.http.put(this.APIUrl + '/users/', val)
  }

  getTypes():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/types/')
  }

  getPosts():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/posts/')
  }

  getPost(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/posts/' + id)
  }

  addPosts(val:any){
    return this.http.post(this.APIUrl + '/posts/', val)
  }

  updatePosts(val:any){
    return this.http.put(this.APIUrl + '/posts/', val)
  }

  deletePostList(val:any){
    return this.http.put(this.APIUrl + '/posts/', val)
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl + '/SaveFile/', val)
  }

}

export class LoginData{
  public logged:any = localStorage.getItem('logged');
  public userId:any = localStorage.getItem('userid');
  public userName: any = localStorage.getItem('username');
  public Password: any = localStorage.getItem('password');
  // public language: any = localStorage.getItem('language');
}
