import { PostsService } from './../../core/services/post.service';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {

  @Input() post;
  public sliderArray: Array<{ id: number, url: string }> = [];

  constructor(
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.sliderArray = this.post.data.map(item => {
      return {id: item.id, url: `${environment.apiUrl}${item.path}` }
    });
  }

  like() {
    this.postsService.like(this.post.id).subscribe(
      data => {
        if (data === 'Like deleted') {
          this.post.countLikes -= 1;
          this.post.selfLike = false;
        } else {
          this.post.countLikes += 1;
          this.post.selfLike = true;
        }
      }
    )
  }

}
