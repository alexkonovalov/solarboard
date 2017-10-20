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
    MatProgressSpinnerModule
  ]
})
export class SharedModule {}
