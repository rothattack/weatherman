import { SocialUser } from '@abacritt/angularx-social-login';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../core/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  user$: Observable<SocialUser>;

  constructor(private store: Store<{ state: AppState }>) {}

  ngOnInit() {
    this.user$ = this.store.select(({ state }) => state.user);
  }
}
