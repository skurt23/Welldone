import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Post} from "../../models/post";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  private routeSub: Subscription;
  private token: string;
  public post:any = {};

  constructor(private _postService: PostService, private __activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.token = localStorage.getItem('welldone_token');
    this.routeSub = this.__activatedRoute.params.subscribe(params => {
      let id = +params['postId'];
      this._postService.getPost(id.toString(), this.token).subscribe((article:Post)=>{
        this.post = article;
        this.post.id = id;
        console.log(this.post)
      })

    });

  }

  public updatePost(post:any){
    this._postService.editPost(post, this.token).subscribe((res)=>{
      console.log(res);
    })
  }
}
