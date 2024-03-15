import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingBlogComponent } from './editing-blog.component';

describe('EditingBlogComponent', () => {
  let component: EditingBlogComponent;
  let fixture: ComponentFixture<EditingBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditingBlogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditingBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
