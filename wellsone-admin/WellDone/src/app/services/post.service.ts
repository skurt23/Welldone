import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import { GLOBAL } from './global';
import {Post} from "../models/post";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PostService {

  constructor(private _http: Http) { }

  getUserFavourites(username: string, token:string){
    let headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization', `JWT ${token}`);

    let options = new RequestOptions({ headers: headers });
    return this._http.get('http://localhost:8000/apiv1/favourite/?owner=' + username, options);
  }

  getUserPosts(token:string){
    let headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization', `JWT ${token}`);

    let options = new RequestOptions({ headers: headers });
    return this._http.get('http://localhost:8000/apiv1/articleuser/', options);
  }

  getUserUnderlinedTexts(username:string, token:string){
    let headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization', `JWT ${token}`);

    let options = new RequestOptions({ headers: headers });
    return this._http.get('http://localhost:8000/apiv1/underlines/?nombre_de_usuario=' + username, options);
  }

  getPost(postId: string, token:string): Observable<Post>{
    let headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization', `JWT ${token}`);

    let options = new RequestOptions({ headers: headers });
    return this._http.get('http://localhost:8000/apiv1/article/' + postId + '/', options).map((res:Response)=>{
      return Post.fromJson(res.json())
    });
  }

  getCategories(): any{
    let headers = new Headers({ 'Content-type': 'application/json' });

    let options = new RequestOptions({ headers: headers });
    return this._http.get('http://localhost:8000/apiv1/category/', options).map((res:Response)=>{
      return res.json();
    });
  }

  createPost(post:any, token:string){
    let headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization', `JWT ${token}`);

    let body = post;

    let options = new RequestOptions({ headers: headers });
    return this._http.post('http://localhost:8000/apiv1/article/', body, options).map((res:Response)=>{
      console.log(res);
      return res.json();
    });
  }

  editPost(post:any, token: string){

    console.log(post);

    let headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization', `JWT ${token}`);

    let body = post;

    let options = new RequestOptions({ headers: headers });
    return this._http.put('http://localhost:8000/apiv1/article/' + post.id + '/', body, options).map((res:Response)=>{
      console.log(res);
      return res.json();
    });
  }

}
