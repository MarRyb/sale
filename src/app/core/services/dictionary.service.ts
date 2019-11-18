import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(private api: ApiService) {
  }

  getCurrency() {
    return this.api.get('api/v1/static/currency');
  }

}

