import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoadingComponent } from '@app/core/components/app-loading/app-loading.component';
import { AlertComponent } from '@app/core/alert/alert.component';

@NgModule({
  declarations: [AppLoadingComponent, AlertComponent],
  imports: [CommonModule],
  exports: [AppLoadingComponent, AlertComponent],
})
export class CoreModule {}
