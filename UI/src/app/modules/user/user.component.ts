import { Component, OnInit } from '@angular/core';
import { LoginData, SheredService } from '../helpers/shered.service';
import { ValidationService } from '../helpers/validation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{
  
  constructor(
    private service: SheredService,
    private logindata: LoginData,
    protected validation: ValidationService
  ){}

  userID = this.logindata.userId;
  username = this.logindata.userName;
  password = this.logindata.Password;
  err_mes = "";
  err = false;
  users:any=[];

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe(data=>{
      this.users = data;
    }) 
  }
  
  ChangeUserdata(){
    var val = { UserId: this.userID,
                Username: this.username,
                Password: this.password}
    var validate = this.validation.ValidateUser(val, false, this.users);
    if(validate){
      localStorage.setItem('username', val.Username);
      localStorage.setItem('password', val.Password);
      this.service.updateUser(val).subscribe();
      window.location.reload();
    }else{
      this.err=true;
    }
  }
}
