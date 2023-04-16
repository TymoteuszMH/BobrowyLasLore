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

import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './modules/navbar/navbar.component'
import { ValidationService } from './modules/helpers/validation.service';
import { CheckService } from './modules/helpers/check.service';
import { SheredService, LoginData } from './modules/helpers/shered.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';

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
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    EditorModule,
  ],
  providers: [SheredService, LoginData, ValidationService, CheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
