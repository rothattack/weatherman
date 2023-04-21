import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { settingsUpdate } from '../core/store/actions';
import { AppState } from '../core/types';
import { AppDataService } from '../core/services/appdata/app-data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  weatherApiUrl = new FormControl('');
  weatherApiKey = new FormControl('');
  destroy$ = new Subject();
  private userId: string;

  constructor(
    private store: Store<{ state: AppState }>,
    private appDataService: AppDataService
  ) {}

  ngOnInit(): void {
    this.store
      .select(({ state }) => state)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ user, setting }) => {
        this.weatherApiUrl.setValue(setting.weatherApiUrl);
        this.weatherApiKey.setValue(setting.weatherApiKey);
        this.userId = user.id;
      });
  }

  updateSettings() {
    const setting = {
      weatherApiUrl: this.weatherApiUrl.value,
      weatherApiKey: this.weatherApiKey.value,
    };

    this.appDataService
      .updateSettings(this.userId, setting)
      .subscribe(() => alert('Settings Saved!'));
    this.store.dispatch(settingsUpdate({ setting }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
