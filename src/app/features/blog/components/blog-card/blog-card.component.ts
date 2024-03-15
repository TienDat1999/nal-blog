import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBlogContent } from '@app/features/blog/models/blog.model';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  @Input() blogInfo!: IBlogContent;
  @Output() selectBlogItem = new EventEmitter();
}
