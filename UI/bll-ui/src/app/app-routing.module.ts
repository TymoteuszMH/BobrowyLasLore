import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ArticulesComponent } from './modules/posts/articules/articules.component';
import { CharactersComponent } from './modules/posts/characters/characters.component';
import { PostdetailsComponent } from './modules/posts/postdetails/postdetails.component';
import { PostsComponent } from './modules/posts/posts.component';
import { StoriesComponent } from './modules/posts/stories/stories.component';
import { UserComponent } from './modules/user/user.component';

export const login: Routes = [
  {path:'', component:LoginComponent},
  {path: '**', redirectTo: ''}
];
export const site: Routes = [
  {path:'', component:PostsComponent},
  {path:'user', component:UserComponent},
  {path:'articules', component:ArticulesComponent},
  {path:'characters', component:CharactersComponent},
  {path:'stories', component:StoriesComponent},
  {path:'post/:id', component:PostdetailsComponent},
  {path: '**', redirectTo: ''}
];

function CheckLog(){
  if(localStorage.getItem('logged')=='1'){
    return site;
  }else{
    return login;
  }
}

@NgModule({
  imports: [RouterModule.forRoot(CheckLog())],
  exports: [RouterModule]
})
export class AppRoutingModule { }
