import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Post} from "../../models/post";
import {FormGroup} from "@angular/forms";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  @Input() post:Post;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  @ViewChild('form') form;
  public categories:any[];
  private categorySelected: any[] = [];

  constructor(private _postService: PostService) { }

  ngOnInit() {

    this._postService.getCategories().subscribe((cats:any)=>{
        this.categories = cats.results;
    });

    if (typeof this.post !== 'undefined'){
      this.form.title = this.post.title;
      this.form.introduction = this.post.introduction;
      this.form.body = this.post.body;
      this.form.media_url = this.post.media_url;
    }
  }

  public submitForm(form: FormGroup){
    let post = {
      title: form.value.title,
      introduction: form.value.introduction,
      body: form.value.body,
      media_url: form.value.media_url,
      category:[this.categorySelected],
      visibility: 'PUB',
      status_pub: 'RDY'
    };

    if (typeof this.post !== 'undefined'){
      post = {
        title: form.value.title,
        introduction: form.value.introduction,
        body: form.value.body,
        media_url: form.value.media_url,
        category:[this.categorySelected],
        visibility: 'PUB',
        status_pub: 'RDY'
      };
    }

    this.formSubmitted.emit(post);
  }

  public changeValue(value:any){
    this.categorySelected = value;
  }

}
