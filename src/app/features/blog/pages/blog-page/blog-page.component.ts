import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/features/blog/services/blog.service';
import {
  BlogFilterModel,
  IBlogContent,
} from '@app/features/blog/models/blog.model';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent implements OnInit {
  blogFilter: BlogFilterModel = new BlogFilterModel();
  blogList: IBlogContent[] = [];
  isloading: boolean = true;
  searchForm: FormControl = new FormControl('');
  currentPage = 1;
  totalPages = 0;
  count = 0;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    // get all blogs the first time
    this.getBlogs();
    // register for search blog input
    this.handleSearchBlog();
  }
  onHandlePageChange(page: number) {
    this.currentPage = page;
    this.blogFilter.page = page;
    this.getBlogs();
  }

  handleSearchBlog() {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => {
        this.blogFilter.search = value;
        this.getBlogs();
      });
  }

  sortBlogChange(evt: Event) {
    const element = evt.currentTarget as HTMLInputElement;
    this.blogFilter.sort_direction = element.value;
    this.getBlogs();
  }

  getBlogs() {
    this.isloading = true;
    this.blogService
      .getBlogs(this.blogFilter)
      .pipe(finalize(() => (this.isloading = false)))
      .subscribe(res => {
        this.blogList = res.data;
        this.totalPages = res.pagination.total;
        this.count = res.pagination.count;
      });
    //this.blogList = await this.generateData();
  }

  async fetchImageUrls() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos?_limit=20'
      );
      const data = await response.json();
      return data.map((item: any) => item.url);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
      return [];
    }
  }

  async generateData() {
    const imageUrls = await this.fetchImageUrls();
    const data = [];

    for (let i = 0; i < 20; i++) {
      const id = `id_${i + 1}`;
      const title = `Title ${i + 1}`;
      const content = `Content ${i + 1}`;
      const comments_count = Math.floor(Math.random() * 100); // Random number for comments_count
      const imageUrl = imageUrls[i] || 'https://via.placeholder.com/150'; // Use a placeholder URL if real URL is not available
      const image = { url: imageUrl };
      const created_at = new Date().toISOString(); // Current timestamp for created_at
      const updated_at = new Date().toISOString(); // Current timestamp for updated_at

      const item = {
        id,
        title,
        content,
        comments_count,
        image,
        created_at,
        updated_at,
      };

      data.push(item);
    }

    return data;
  }
}
