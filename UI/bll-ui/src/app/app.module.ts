import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ArticlesComponent } from './modules/posts/articles/articles.component';
import { StoriesComponent } from './modules/posts/stories/stories.component';
import { CharactersComponent } from './modules/posts/characters/characters.component';
import { UserComponent } from './modules/user/user.component';
import { AddpostComponent } from './modules/posts/addpost/addpost.component';
import { PostdetailsComponent } from './modules/posts/postdetails/postdetails.component';
import { DeletepostComponent } from './modules/posts/deletepost/deletepost.component';
import { LoginData, SheredService } from './shered.service';

import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './modules/navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostsComponent,
    ArticlesComponent,
    StoriesComponent,
    CharactersComponent,
    UserComponent,
    AddpostComponent,
    PostdetailsComponent,
    DeletepostComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SheredService, LoginData],
  bootstrap: [AppComponent]
})
export class AppModule { }
