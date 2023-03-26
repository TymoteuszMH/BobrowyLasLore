import { Component, OnInit } from '@angular/core';
import { LoginData, SheredService } from 'src/app/shered.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  
  constructor(
    private service: SheredService,
    private logindata: LoginData
  ){}

  userID = this.logindata.userId;
  username = this.logindata.userName;
  password = this.logindata.Password;
  err_mes = "";
  err = false;
  users:any=[];

  ngOnInit(){
    this.GetUsers();
  }

  GetUsers(){
    this.service.getAllUsernames().subscribe(data=>{
      this.users = data;
    })
  }

  ChangeUserdata(){
    var val = { UserId: this.userID,
                Username: this.username,
                Password: this.password}
    var validate = this.Validate(val);
    if(validate){
      localStorage.setItem('username', val.Username);
      localStorage.setItem('password', val.Password);
      this.service.updateUser(val).subscribe();
      window.location.reload();
    }else{
      this.err=true;
    }
  }

  UsernameCheck(val:any){
    var check = true;
    this.users.forEach((element: any) => {
      if(val.Username == element.Username){
        check = false;
      }
    });
    return check;
  }

  Validate(val: any){
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
    else if (val.Password.length < 8){
      this.err_mes="Password can't be shorter than 8 characters!";
      return false;
    }
    return this.UsernameCheck(val)
  }
}
