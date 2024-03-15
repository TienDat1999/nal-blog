import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { CardSkeletonComponent } from '@app/shared/components/card-skeleton/card-skeleton.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent, CardSkeletonComponent],
  exports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    CardSkeletonComponent,
  ],
})
export class SharedModule {}
