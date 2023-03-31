import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'Bobrowy Las Lore';
  islogged: any = true;
  //checking if user is logged to show navbar
  ngDoCheck(){
    if(localStorage.getItem('logged')=='1')
      this.islogged = true;
    else
      this.islogged = false;
  }
}
