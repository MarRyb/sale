import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private api: ApiService) {
  }

  getList() {
    return this.api.get('open_api/v1/static/category/');
  }
  create() {
    return this.api.post('api/v1/admin/category/new');
  }
}

