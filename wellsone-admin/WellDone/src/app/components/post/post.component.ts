import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Post} from "../../models/post";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() public post: Post;
  public source: any;
  public isYoutube: boolean = false;
  public isVimeo: boolean = false;
  public isImage: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.post.media_url.endsWith('.jpg') || this.post.media_url.endsWith('.gif') || this.post.media_url.endsWith('.png')){

      this.source = this.post.media_url;
      this.isImage = true;

    }else if(this.post.media_url.startsWith('https://www.youtube.com/embed/')){

      this.source = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.media_url);
      this.isYoutube = true;

    }else if(this.post.media_url.startsWith('http://player.vimeo.com/video/')){

      this.source = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.media_url);
      this.isVimeo = true;

    }
  }

}
