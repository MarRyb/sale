import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private api: ApiService) {
  }

  getList(params: {page: number}) {
    return this.api.get('open_api/v1/posts/', params);
  }
  get(slug: string) {
    return this.api.get(`open_api/v1/posts/${slug}`);
  }
  new(body) {
    return this.api.post('api/v1/posts/new', body);
  }

  postFiles(formData) {
    return this.api.post('api/v1/posts/files', formData);
  }
}

