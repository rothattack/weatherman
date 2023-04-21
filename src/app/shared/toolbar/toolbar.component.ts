import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../core/types';
import { userUpdate } from '../../core/store/actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: SocialAuthService,
    private store: Store<{ state: AppState }>,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(({ state }) => state.isLoggedIn);
  }

  logout() {
    this.router.navigate(['/home']);
    this.store.dispatch(userUpdate(null));
    this.authService.signOut();
  }
}
