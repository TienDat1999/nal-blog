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

  it('should initialize form with empty values', () => {
    expect(component.blogForm.value).toEqual({ title: '', content: '' });
  });

  it('should mark title field as invalid when empty', () => {
    const title = component.blogForm.controls?.['title'];
    expect(title.valid).toBeFalsy();
    expect(title.errors?.['required']).toBeTruthy();
  });

  it('should mark content field as invalid when empty', () => {
    const content = component.blogForm.controls?.['content'];
    expect(content.valid).toBeFalsy();
    expect(content.errors?.['required']).toBeTruthy();
  });

  it('should mark form as invalid when any field is empty', () => {
    component.blogForm.controls?.['title'].setValue('Sample Title');
    expect(component.blogForm.valid).toBeFalsy();
  });

  it('should mark form as valid when all fields are filled', () => {
    component.blogForm.controls?.['title'].setValue('Sample Title');
    component.blogForm.controls?.['content'].setValue('Sample Content');
    expect(component.blogForm.valid).toBeTruthy();
  });

  it('should call onSubmit method when form is submitted', () => {
    spyOn(component, 'onSave');
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(component.onSave).toHaveBeenCalled();
  });
});
