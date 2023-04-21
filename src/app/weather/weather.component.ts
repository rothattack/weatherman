import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  catchError,
  from,
  takeUntil,
  throwError,
} from 'rxjs';
import { AppState } from '../core/types';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  user$: Observable<SocialUser>;
  weatherApiKey = '';
  weatherApiUrl = '';
  weatherApiResponse = '';
  destroy$ = new Subject();

  constructor(private store: Store<{ state: AppState }>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(({ state }) => state.user);
    this.store
      .select(({ state }) => state.setting)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ weatherApiKey, weatherApiUrl }) => {
        this.weatherApiKey = weatherApiKey;
        this.weatherApiUrl = weatherApiUrl;
      });
  }

  submit(city: string) {
    from(
      fetch(
        `${this.weatherApiUrl}?access_key=${this.weatherApiKey}&query=${city}`
      ).then((res) => res.json())
    )
      .pipe(
        catchError(() => {
          alert('Access Denied: Please verify Api Url and Key');
          return throwError(() => new Error('Access Denied'));
        })
      )
      .subscribe((response) => {
        this.weatherApiResponse = JSON.stringify(response, null, '  ');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
