import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-underlined',
  templateUrl: './user-underlined.component.html',
  styleUrls: ['./user-underlined.component.scss']
})
export class UserUnderlinedComponent implements OnInit {

  public posts: Post[] = [];
  private token: string;
  private username: string
  public alertMessage: string = 'Todavía no has subrayado ningún texto. ¡Anímate a guardar las frases de cada artículo que mas te gusten!';
  public empty = false;

  constructor(private _postService: PostService, private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('welldone_token');
    this.username = localStorage.getItem('welldone_identity');

    this._postService.getUserUnderlinedTexts( this.username, this.token).subscribe((posts: any)=>{
      let response = JSON.parse(posts._body);


      let articles = response.results;

      if (articles.length !== 0){
        articles.forEach(each=>{
          this._postService.getPost(each.article, this.token).subscribe((post: Post)=>{
            let article = post;
            article.id = each.article;
            this._userService.getAll(this.token).subscribe((users:any)=>{

              let results = users.results.filter((user)=>{
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
