/**
 * Created by skurt on 24/2/17.
 */
/**
 * Angular modules
 */
import {Routes} from '@angular/router';

/**
 * Components
 */


import { EdituserComponent } from "./components/edituser/edituser.component";
import { PassrecoveryComponent } from "./components/passrecovery/passrecovery.component";
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';
import { UserUnderlinedComponent } from './components/user-underlined/user-underlined.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {EditPostComponent} from "./components/edit-post/edit-post.component";


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'articles',
        data: ['Mis artículos'],
        component: UserPostsComponent
      },
      {
        path: 'favorites',
        data: ['Mis favoritos'],
        component: UserFavoritesComponent
      },
      {
        path: 'underlined',
        data: ['Mis subrayados'],
        component: UserUnderlinedComponent
      },
      {
        path: 'create',
        data: ['Nuevo artículo'],
        component: CreatePostComponent
      },
      {
        path: 'editprofile',
        data: ['Editar mi perfil'],
        component: EdituserComponent
      },
      {
        path: 'edit/:postId',
        component: EditPostComponent
      },
      {
        path: 'detail/:pk',
        component: DetailPostComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'passrecovery',
    component: PassrecoveryComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
