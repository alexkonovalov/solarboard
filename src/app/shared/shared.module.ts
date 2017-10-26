import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatMenuModule,
  MatSelectModule,
  MatCardModule,
  MatChipsModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTableModule,
  MatListModule,
  MatTabsModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';

import pipes from './pipes';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTableModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  declarations: pipes,
  exports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTableModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ...pipes
  ]
})
export class SharedModule {}
