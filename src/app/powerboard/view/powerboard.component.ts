import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { panelsSelector } from '../powerboard.reducer';
import { actionRetrievePower } from '../powerboard.action';

@Component({
  selector: 'slrb-powerboard',
  templateUrl: './powerboard.component.html',
  styleUrls: ['./powerboard.component.scss']
})
export class PowerboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  panels: any[];

  constructor(private store: Store<any>) {
    store
      .select(panelsSelector)
      .do(state => console.log('PowerboardComponent selector subscription::', state))
      .takeUntil(this.unsubscribe$)
      .subscribe(panels => (this.panels = panels));
  }

  ngOnInit() {
    this.store.dispatch(actionRetrievePower());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
