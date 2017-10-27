import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { routerTransition } from '@app/core';
import { environment as env } from '@env/environment';

const GOOGLE_MATERIAL_THEME = 'black-theme';

@Component({
  selector: 'slrb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass = GOOGLE_MATERIAL_THEME;
  logo = require('../assets/slrb-logo.png');

  navigation = [
    { link: 'powerboard', label: 'Dashboard' },
    { link: 'weather', label: 'Weather' }
  ];
  navigationSideMenu = [
    { link: 'about', label: 'About' },
    ...this.navigation
  ];

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.overlayContainer.getContainerElement().classList.add(GOOGLE_MATERIAL_THEME);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
