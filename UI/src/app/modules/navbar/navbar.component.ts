import { Component } from '@angular/core';
import { LoginData } from '../helpers/shered.service';
import { ChangerouteService } from '../helpers/changeroute.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  constructor(public logindata: LoginData,
              private changeroute: ChangerouteService){}


  logged = this.logindata.logged;
  login = this.logindata.userName;
  logId = this.logindata.userId;
  //changing data after logout
  logout(){
    localStorage.setItem('logged','0');
    localStorage.setItem('userid','0');
    localStorage.setItem('username','');
    this.changeroute.change(false);
    this.logindata.Check();
  }

}
