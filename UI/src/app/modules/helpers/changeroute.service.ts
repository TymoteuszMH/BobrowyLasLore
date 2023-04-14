import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, site } from 'src/app/app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class ChangerouteService {

  constructor(private router: Router) { }
  //function to change routing
  change(logged: boolean){
    if(logged){
      this.router.resetConfig(site);
    }else{
      this.router.resetConfig(login);
    }
    this.router.navigate([ '/' ]);
  }
}
