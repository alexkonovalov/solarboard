import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { Action, launchRequests, ACTION_KEYS } from '@app/core';
import { PowerboardService } from './powerboard.service';
import { SETTINGS_KEY, SETTINGS_REQUEST_PANEL_DATA, requestPanelSuccess } from './powerboard.reducer';
import { actionRetrievePowerSuccess, RetrievePowerActionSuccess } from './powerboard.action';


@Injectable()
export class PowerboardEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<any>,
    private service: PowerboardService
  ) {}

  @Effect()
  requestPanelData(): Observable<RetrievePowerActionSuccess> {
    return this.actions$.ofType(ACTION_KEYS.LAUNCH_REQUESTS/* SETTINGS_REQUEST_PANEL_DATA */)
      .switchMap(action => {
        console.log('!!!!requestPanelData');
        return this.service.retrievePower()
        .map(plants => actionRetrievePowerSuccess(plants));
      });
    }
}

