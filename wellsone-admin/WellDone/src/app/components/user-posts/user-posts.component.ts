import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  public posts: Post[] = [];
  private token: string;
  public alertMessage: string = 'Todavía no has subido ningún artículo. ¡Anímate a crear el primero!';
  public empty = false;

  constructor(private _postService: PostService, private _userService: UserService, private _router: Router) { }

  ngOnInit() {

    this.token = localStorage.getItem('welldone_token');

    this._postService.getUserPosts( this.token).subscribe((posts: any)=>{
      let response = JSON.parse(posts._body);


      let articles = response.results;

      if (articles.length !== 0){
        articles.forEach(each=>{
          this._postService.getPost(each.id, this.token).subscribe((post: Post)=>{
            let article = post;
            article.id = each.id;

            this._userService.getAll(this.token).subscribe((users:any)=>{

              let results = users.results.forEach((user)=>{

                if (user.username === article.owner){
                  if (typeof user.profile !== 'undefined' && user.profile !== null){
                    article.avatar = user.profile.avatar;
                    return true;
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
