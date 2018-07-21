/**
 * Created by skurt on 9/5/17.
 */

export class Post {

  private constructor(
    public id: number,
    public title: string,
    public avatar: string,
    public introduction: string,
    public body: string,
    public media_url: string,
    public created_at: any,
    public modified_at: any,
    public publicated_at: any,
    public category: any[],
    public owner: string,
    public likes: number,
    public dislikes: number,
    public visibility: string,
    public status_pub: string,
  ) { }

  static fromJson(json: any): Post {
    return new Post(
      json.id,
      json.title,
      json.avatar,
      json.introduction,
      json.body,
      json.media_url,
      json.created_at,
      json.modified_at,
      json.publicated_at,
      json.category,
      json.owner,
      json.likes,
      json.dislikes,
      json.visibility,
      json.status_pub
    );
  }

  static fromJsonToList(json: any): Post[] {
    return (json as any[]).reduce((posts: Post[], post: Post) => {
      posts.push(Post.fromJson(post));
      return posts;
    }, []);
  }
}
