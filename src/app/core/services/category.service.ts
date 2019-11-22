import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { ICategory } from '../interfaces/categories.interface';
@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private api: ApiService) {
  }

  getList(): Observable<ICategory[]> {
    return this.api.get('open_api/v1/static/category/');
  }
  get(slug: string) {
    return this.api.get(`open_api/v1/static/category/${slug}`);
  }
}

