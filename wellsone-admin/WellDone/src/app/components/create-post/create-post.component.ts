import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  private token:string;

  constructor(private _postService: PostService, private _router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('welldone_token');
  }

  public createPost(post: any){
    this._postService.createPost(post, this.token).subscribe((res)=>{
      this._router.navigate(['/articles']);
    });
  }
}
