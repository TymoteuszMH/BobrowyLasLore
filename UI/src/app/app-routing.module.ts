import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ArticlesComponent } from './modules/posts/articles/articles.component';
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
  {path:'articles', component:ArticlesComponent},
  {path:'characters', component:CharactersComponent},
  {path:'stories', component:StoriesComponent},
  {path:'details/:id', component:PostdetailsComponent},
  {path: '**', redirectTo: ''}
];
//checking if user is logged, changing site's route
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
