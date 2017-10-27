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

import { MomentFormatPipe, MomentUtcPipe} from './pipes';
const pipes = [MomentFormatPipe, MomentUtcPipe];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
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
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    ...pipes
  ]
})
export class SharedModule {}
