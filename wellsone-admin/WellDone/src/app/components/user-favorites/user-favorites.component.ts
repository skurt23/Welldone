import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})
export class UserFavoritesComponent implements OnInit {

  public posts: Post[] = [];
  private username: string = 'kerberos';
  private token: string;
  public alertMessage: string = 'Todavía no has seleccionado ningún artículo como favorito. ¡Anímate a seleccionar el primero!';
  public empty = false;

  constructor(private _postService: PostService, private _userService: UserService, private _router: Router) { }

  ngOnInit() {

    this.token = localStorage.getItem('welldone_token');

    this._postService.getUserFavourites(this.username, this.token).subscribe((posts: any)=>{
      let response = JSON.parse(posts._body);

      let favorites = response.results;

      if (favorites.length !== 0){
        favorites.forEach(favorite=>{
          this._postService.getPost(favorite.article, this.token).subscribe((post: Post)=>{
            let article = post;
            article.id = favorite.article;

            this._userService.getAll(this.token).subscribe((users:any)=>{

              let results = users.results.forEach((user)=>{

                if (user.username === article.owner){
                  if (typeof user.profile !== 'undefined' && user.profile !== null && user.profile.avatar !== null){
                    article.avatar = user.profile.avatar;
                    return true;
                  }else{
                    article.avatar = '../../assets/images/placeholder-user.png'
                  }
                }
              });

              this.posts.push(article);
            });

          });
        })
      }else{
        this.empty = true;
      }

    }, (error)=>{
      if (error.status === 401){
        localStorage.removeItem('welldone_token');
        localStorage.removeItem('welldone_identity');
        this._router.navigate(['/login']);
      }
    });
  }

}
