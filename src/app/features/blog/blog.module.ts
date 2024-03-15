import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCardComponent } from '@app/features/blog/components/blog-card/blog-card.component';
import { BlogPageComponent } from '@app/features/blog/pages/blog-page/blog-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { BlogDetailComponent } from '@app/features/blog/pages/blog-detail/blog-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditingBlogComponent } from '@app/features/blog/pages/editing-blog/editing-blog.component';
import { CoreModule } from '@app/core/core.module';

const routes: Routes = [
  { path: 'blogs', component: BlogPageComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'blog-editing/:id', component: EditingBlogComponent },
  { path: '', redirectTo: '/blogs', pathMatch: 'full' }, // Default route to redirect to blog list
  { path: '**', redirectTo: '/blogs', pathMatch: 'full' }, // Redirect to blog list for any other unknown routes
  ///{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  declarations: [
    BlogPageComponent,
    BlogCardComponent,
    BlogDetailComponent,
    EditingBlogComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CoreModule,
  ],
})
export class BlogModule {}
