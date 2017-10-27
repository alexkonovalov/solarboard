import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { panelsSelector, isErrorSelector, isLoadingSelector } from '../powerboard.reducer';
import { actionPollPower, actionPollPowerStop } from '../powerboard.action';

@Component({
  selector: 'slrb-powerboard',
  templateUrl: './powerboard.component.html',
  styleUrls: ['./powerboard.component.scss']
})
export class PowerboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  panels: any[];
  isLoading: boolean;
  isError: boolean;

  constructor(private store: Store<any>) {
    store
      .select(panelsSelector)
      .takeUntil(this.unsubscribe$)
      .subscribe(panels => (this.panels = panels));

    store
      .select(isErrorSelector)
      .takeUntil(this.unsubscribe$)
      .subscribe(isError => (this.isError = isError));

    store
      .select(isLoadingSelector)
      .takeUntil(this.unsubscribe$)
      .subscribe(isLoading => (this.isLoading = isLoading));
  }

  ngOnInit() {
    this.store.dispatch(actionPollPower());
  }

  ngOnDestroy(): void {
    this.store.dispatch(actionPollPowerStop());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
