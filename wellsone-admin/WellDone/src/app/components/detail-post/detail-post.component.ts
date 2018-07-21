import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {Location} from "@angular/common";

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

  public article: Post = Post.fromJson({});
  private token: string;
  private username: string;
  public source: any;
  public isYoutube: boolean = false;
  public isVimeo: boolean = false;
  public isImage: boolean = false;
  public fbTemp = '<li><a href="#"><i class="fa fa-facebook"></i> <span>COMPARTIR</span></a></li>';
  public twttTemp = '<li><a href="#"><i class="fa fa-twitter"></i> <span>TWEET</span></a></li>';
  private routeSub: Subscription;
  public publicated: boolean = true;

  constructor(private _sanitizer: DomSanitizer, private __activatedRoute: ActivatedRoute, private _postService: PostService,
  private _location: Location) { }

  ngOnInit() {
    this.token = localStorage.getItem('welldone_token');
    this.username = localStorage.getItem('welldone_identity');
    this.routeSub = this.__activatedRoute.params.subscribe(params => {
      let id = +params['pk'];

      this._postService.getPost(id.toString(), this.token).subscribe((post:Post)=>{
        this.article = post;
        this.article.id = id;

        if (this.article.status_pub !== 'RDY' && this.article.owner === this.username.replace(/\"/g, '')){
          this.publicated = false;
        }

        if(typeof this.article.avatar === 'undefined' || this.article.avatar === null){
          this.article.avatar = '../../assets/images/placeholder-user.png';
        }

        if (this.article.media_url.endsWith('.jpg') || this.article.media_url.endsWith('.gif') || this.article.media_url.endsWith('.png')){

          this.source = this.article.media_url;
          this.isImage = true;

        }else if(this.article.media_url.startsWith('https://www.youtube.com/embed/')){

          this.source = this._sanitizer.bypassSecurityTrustResourceUrl(this.article.media_url);
          this.isYoutube = true;

        }else if(this.article.media_url.startsWith('http://player.vimeo.com/video/')){

          this.source = this._sanitizer.bypassSecurityTrustResourceUrl(this.article.media_url);
          this.isVimeo = true;

        }
      })

    });

  }

  public back(){
    this._location.back();
  }

}
