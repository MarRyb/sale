import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private api: ApiService) {
  }

  getList() {
    return this.api.get('open_api/v1/posts/');
  }
  get(slug: string) {
    return this.api.get(`open_api/v1/posts/${slug}`);
  }
}

