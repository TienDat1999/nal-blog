import { Injectable } from '@angular/core';
import { environment } from '../../../../eviroments/enviroment';
import { BlogFilterModel } from '@app/features/blog/models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogUrlService {
  apiUrl = environment.apiurl + '/api/v2/blogs';
  constructor() {}

  public getBlogsUrl(): string {
    return `${this.apiUrl}`;
  }

  public getBlogById(id: string): string {
    return `${this.apiUrl}/${id}`;
  }
}
