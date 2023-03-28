import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from 'src/app/app-routing.module';
import { LoginData } from '../helpers/shered.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  constructor(public logindata: LoginData,
              private router: Router){}


  logged = this.logindata.logged
  login = this.logindata.userName
  logId = this.logindata.userId

  Logout(){
    localStorage.setItem('logged','0')
    localStorage.setItem('userid','0')
    localStorage.setItem('username','')
    this.router.resetConfig(login);
    this.router.navigate([ '/' ]);
    window.location.reload();
  }

}
