import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../types';

@Injectable()
export default class CanActivateRoute implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<{ state: AppState }>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.store.select(({ state }) => Boolean(state.user?.id));
  }
}
