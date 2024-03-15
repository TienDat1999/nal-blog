import {
  Component,
  ElementRef,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertService } from '@app/core/services/alert.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  messages: { text: string; type: string }[] = [];

  @ViewChild('alertContainer') alertContainer?: ElementRef;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alertSubject$.subscribe(res => {
      console.log('aaaaasdas');
      this.addMessage(res.message, res.type);
    });
  }

  addMessage(text: string, type: string) {
    this.messages.push({ text, type });
    setTimeout(() => this.removeMessage(this.messages[0]), 5000); // Remove the message after 5 seconds
  }

  removeMessage(message: { text: string; type: string }) {
    const index = this.messages.indexOf(message);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }
}
