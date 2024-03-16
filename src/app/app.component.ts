import {Component, OnInit} from '@angular/core';
import {IAppState} from "@app/store/modeles/app.interface";
import {Store} from "@ngrx/store";
import { login } from './store/actions/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  constructor(private store: Store<IAppState>) {

  }
  ngOnInit() {
    //this.login();
  }

  login(): void {
    this.store.dispatch(login({ usernamae: 'aaaa', password: 'aaaaaaeee' }));
  }
}
