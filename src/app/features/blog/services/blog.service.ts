import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogUrlService } from '@app/core/services/endpoints/blog-url.service';
import {
  BlogFilterModel,
  IBlogContent,
} from '@app/features/blog/models/blog.model';
import { catchError, map, Observable, of } from 'rxjs';
import { IPagination } from '@app/shared/components/pagination/pagination.component';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(
    private http: HttpClient,
    private blogUrl: BlogUrlService
  ) {}

  getBlogs(
    filter: BlogFilterModel
  ): Observable<{ data: IBlogContent[]; pagination: IPagination }> {
    return this.http
      .get<any>(this.blogUrl.getBlogsUrl(), {
        params: {
          page: filter.page,
          offset: filter.offset,
          search: filter.search,
          sort_by: filter.sort_by,
          sort_direction: filter.sort_direction,
        },
      })
      .pipe(
        catchError(this.handleError<any>('getBlogs', null)),
        map(res => {
          return { data: res?.data?.items, pagination: res?.pagination };
        })
      );
  }

  getBlogById(id: string): Observable<IBlogContent> {
    return this.http.get<any>(this.blogUrl.getBlogById(id)).pipe(
      catchError(this.handleError<any>('getBlogDetail', null)),
      map(res => res.data)
    );
  }

  createBlog(blog: FormData): Observable<IBlogContent> {
    return this.http.post<any>(this.blogUrl.getBlogsUrl(), blog).pipe(
      catchError(this.handleError<any>('getBlogDetail', null)),
      map(res => res.data)
    );
  }

  updateBlog(blog: FormData, id: string): Observable<IBlogContent> {
    return this.http.put<IBlogContent>(this.blogUrl.getBlogById(id), blog).pipe(
      catchError(this.handleError<any>('getBlogDetail', null)),
      map(res => res.data)
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error('getBlogs', error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
