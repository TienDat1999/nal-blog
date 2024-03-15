import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BlogService } from '@app/features/blog/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { IBlogContent } from '@app/features/blog/models/blog.model';
import { finalize } from 'rxjs';
import { AlertComponent } from '@app/core/alert/alert.component';
import { AlertService } from '@app/core/services/alert.service';

@Component({
  selector: 'app-editing-blog',
  templateUrl: './editing-blog.component.html',
  styleUrl: './editing-blog.component.scss',
})
export class EditingBlogComponent implements OnInit {
  isSubmitting = false;
  blogForm: FormGroup = new FormGroup<any>({});

  coverImagePreview: string | ArrayBuffer | null = null;
  isEditBlog = false;
  blogDetail?: IBlogContent;
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getBlogDetail();
  }

  initializeForm(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [''],
    });
  }

  onSave(): void {
    this.isSubmitting = true;
    if (this.blogForm.valid) {
      const formData = new FormData();
      Object.keys(this.blogForm.value).forEach(key => {
        const control = this.blogForm.get(key);
        if (control instanceof FormControl) {
          formData.append(`blog[${key}]`, control.value);
        }
      });
      if (this.isEditBlog && this.blogDetail?.id) {
        // update blog
        this.blogService
          .updateBlog(formData, this.blogDetail.id)
          .pipe(finalize(() => (this.isSubmitting = false)))
          .subscribe(
            value => {
              this.alertService.openAlert(
                'success',
                'Blog updated successfully.'
              );
            },
            error => {
              this.alertService.openAlert('danger', 'Failed to update blog.');
            }
          );
      } else {
        // add new blog
        this.blogService
          .createBlog(formData)
          .pipe(finalize(() => (this.isSubmitting = false)))
          .subscribe(
            value => {
              this.alertService.openAlert(
                'success',
                'Blog created successfully.'
              );
            },
            error => {
              this.alertService.openAlert('danger', 'Failed to create blog.');
            }
          );
      }
    } else {
      this.blogForm.markAllAsTouched();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.previewImage(file);
    this.blogForm.patchValue({
      image: file,
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event?.dataTransfer?.dropEffect) {
      event.dataTransfer.dropEffect = 'copy';
      const dropzone = event.currentTarget as HTMLElement;
      dropzone.classList.add('drag-over');
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = event.currentTarget as HTMLElement;
    dropzone.classList.remove('drag-over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event) {
      const file = event?.dataTransfer?.files[0];
      if (file) {
        this.previewImage(file);
        this.blogForm.patchValue({
          image: file,
        });
        const dropzone = event.currentTarget as HTMLElement;
        dropzone.classList.remove('drag-over');
      }
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.coverImagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeCoverImage(): void {
    this.coverImagePreview = null;
    this.blogForm.patchValue({
      image: '',
    });
  }

  getBlogDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'add-new') {
      this.isEditBlog = true;
      this.blogService.getBlogById(id).subscribe(blog => {
        this.blogForm.patchValue({
          title: blog.title,
          content: blog.content,
        });
        this.blogDetail = blog;
        this.coverImagePreview = blog.image.url;
      });
    }
  }
}
