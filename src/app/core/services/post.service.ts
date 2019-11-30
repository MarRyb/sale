import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private api: ApiService) {
  }

  getList(params: {limit?: number, page?: number, category?: number}) {
    return this.api.get('open_api/v1/posts', params);
  }
  get(slug: string) {
    return this.api.get(`open_api/v1/posts/${slug}`);
  }
  new(body) {
    return this.api.post('api/v1/posts/new', body);
  }

  getById(id: number) {
    return this.api.get(`open_api/v1/posts/show/${id}`);
  }

  postFiles(formData) {
    return this.api.post('api/v1/posts/files', formData);
  }

  attachPostFile(postId: number, fileId: number) {
    return this.api.post(`api/v1/posts/${postId}/files/${fileId}`);
  }

  like(postId: number) {
    return this.api.post(`api/v1/posts/${postId}/likes`);
  }

}

