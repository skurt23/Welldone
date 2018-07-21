/**
 * Angular modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { PassrecoveryComponent } from "./components/passrecovery/passrecovery.component";
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { UserUnderlinedComponent } from './components/user-underlined/user-underlined.component';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderdataComponent } from './components/header-data/headerdata.component';
import { FulluserdataComponent } from './components/full-user-data/fulluserdata.component';



/**
 * Pipes
 */
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FromNowPipe } from './pipes/from-now.pipe';

/**
 * Services
 */
import { PassrecoveryService } from './services/passrecovery.service';
import { FulluserdataService } from './services/fulluserdata.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { HeaderdataService } from './services/headerdata.service';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './services/auth.guard';

/**
 * Config
 */
import { routes } from './app.routing';

/**
 * 3º party modules
 */
import { PushNotificationsModule } from 'angular2-notifications';
import { ShareButtonsModule } from 'ng2-sharebuttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MaterializeModule } from 'angular2-materialize';
import { Ng2Webstorage } from 'ngx-webstorage';
import {EdituserComponent} from "./components/edituser/edituser.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {PostService} from "./services/post.service";
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import {PushNotificationsService} from "angular2-notifications/dist";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EdituserComponent,
    HeaderdataComponent,
    PassrecoveryComponent,
    FulluserdataComponent,
    UserPostsComponent,
    CreatePostComponent,
    NotFoundComponent,
    UserFavoritesComponent,
    DetailPostComponent,
    UserUnderlinedComponent,
    AppFooterComponent,
    PostComponent,
    PostListComponent,
    SearchFilterPipe,
    FromNowPipe,
    EditPostComponent,
    PostFormComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Webstorage.forRoot({prefix: "", caseSensitive: false}),
    ShareButtonsModule.forRoot(),
    ModalModule.forRoot(),
    MaterializeModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    HeaderdataService,
    PushNotificationsService,
    AuthenticationService,
    UserService,
    PostService,
    FulluserdataService,
    PassrecoveryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
