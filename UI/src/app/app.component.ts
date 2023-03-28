import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit{
  title = 'bll-ui';
  islogged: any = true;

  // language: any
  ngOnInit(){
    // localStorage.setItem('language', 'eng');
  }

  ngDoCheck(){
    if(localStorage.getItem('logged')=='1')
      this.islogged = true;
    else
      this.islogged = false;
  }

  // ChangeLanguage(){
  //   if(this.language="pl"){
  //     this.language="eng";
  //     localStorage.setItem('language', 'eng')
  //     window.location.reload();
  //   }else{
  //     this.language="pl";
  //     localStorage.setItem('language', 'pl')
  //     window.location.reload();
  //   }
  // }
}
