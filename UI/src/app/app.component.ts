import { Component, DoCheck } from '@angular/core';
import { LoginData } from './modules/helpers/shered.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  constructor(private logindata: LoginData){}
  title = 'Bobrowy Las Lore';
  islogged: any = true;
  //checking if user is logged to show navbar
  ngDoCheck(){
    this.logindata.Check();
    if(localStorage.getItem('logged')=='1')
      this.islogged = true;
    else
      this.islogged = false;
  }
}
