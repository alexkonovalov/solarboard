import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { Action, launchRequests } from '@app/core';
import { PowerboardService } from './powerboard.service';
import { actionRetrievePowerSuccess, RetrievePowerActionSuccess, ACTION_KEYS } from './powerboard.action';


@Injectable()
export class PowerboardEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<any>,
    private service: PowerboardService
  ) {}

  @Effect()
  requestPanelData(): Observable<RetrievePowerActionSuccess> {
    return this.actions$.ofType(ACTION_KEYS.POWER_RETRIEVE)
      .switchMap(action => {
        console.log('!!!!requestPanelData');
        return this.service.retrievePower()
        .map(plants => actionRetrievePowerSuccess(plants));
      });
    }
}

