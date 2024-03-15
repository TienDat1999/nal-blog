import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  alertSubject$ = this.alertSubject.asObservable();
  constructor() {}

  openAlert(type: string, message: string) {
    this.alertSubject.next({
      type: type,
      message: message,
    });
  }
}
