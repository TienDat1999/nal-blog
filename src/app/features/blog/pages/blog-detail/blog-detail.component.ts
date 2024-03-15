import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '@app/features/blog/services/blog.service';
import { IBlogContent } from '@app/features/blog/models/blog.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
  blogId: string = '';
  blogDetail?: IBlogContent;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    // fetch blog detail data
    this.getBlogDetail();
  }

  getBlogDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getBlogById(id).subscribe(blog => {
        this.blogDetail = blog;
      });
    }
  }
}
