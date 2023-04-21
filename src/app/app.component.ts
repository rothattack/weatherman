import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { settingsUpdate, userUpdate } from './core/store/actions';
import { AppState } from './core/types';
import { AppDataService } from './core/services/appdata/app-data.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private store: Store<{ state: AppState }>,
    private translate: TranslateService,
    private appDataService: AppDataService
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.store.dispatch(userUpdate({ user }));
      this.appDataService
        .updateUser(user)
        .pipe(filter(Boolean))
        .subscribe((user) => {
          console.log('BOINK', user);
          this.store.dispatch(settingsUpdate({ setting: user.setting }));
        });
    });
  }
}
