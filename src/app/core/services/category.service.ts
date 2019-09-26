import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private api: ApiService) {
  }

  getList() {
    return this.api.get('api/v1/static/category/');
  }
}

