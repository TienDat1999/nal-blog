import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IPagination {
  count: number;
  page: number;
  offset: number;
  total: number;
  prev: number;
  next: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 50;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  getPages(): number[] {
    const pagesToShow = [];
    const pagesToDisplay = Math.min(this.totalPages, 5); // Adjust the number of pages to display here

    let start = Math.max(1, this.currentPage - Math.floor(pagesToDisplay / 2));
    const end = Math.min(this.totalPages, start + pagesToDisplay - 1);

    while (pagesToShow.length < pagesToDisplay && start <= end) {
      pagesToShow.push(start);
      start++;
    }

    return pagesToShow;
  }
}
