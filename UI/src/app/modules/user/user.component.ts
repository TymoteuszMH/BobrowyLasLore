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
    private loginData: LoginData,
    protected validation: ValidationService
  ){}

  userID = this.loginData.userId;
  username = this.loginData.userName;
  password = this.loginData.password;
  err_mes = "";
  err = false;

  //checking if edited data is valid, if yes - changing local variables, sending update request and reloading page
  changeUserdata(){
    var val = { UserId: this.userID,
                Username: this.username,
                Password: this.password}
    var validate = this.validation.validateUser(val, false);
    if(validate){
      this.service.updateUser(val, this.loginData.userId).subscribe(res=>{
        if(res == "added"){
          localStorage.setItem('username', val.Username);
          localStorage.setItem('password', val.Password);
          window.location.reload();
        }else{
          this.err=true;
        }
      });
    }else{
      this.err=true;
    }
  }
}
