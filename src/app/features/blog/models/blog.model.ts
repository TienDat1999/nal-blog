export class BlogFilterModel {
  page: number;
  offset: number;
  search: string;
  sort_by: string;
  sort_direction: string;

  constructor(init?: Partial<BlogFilterModel>) {
    this.page = init?.page || 1;
    this.offset = init?.offset || 20;
    this.search = init?.search || '';
    this.sort_by = init?.sort_by || 'created_at';
    this.sort_direction = init?.sort_direction || 'desc';
  }
}

export interface IBlogContent {
  id: string;
  title: string;
  content: string;
  comments_count: number;
  image: {
    url: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ICreateBlog {
  title: string;
  content: string;
  image: File;
}
