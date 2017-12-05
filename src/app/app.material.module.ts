import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material imports
import {
  MatCheckboxModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule

} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule

  ],
  exports: [
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule

  ],
  declarations: []
})
export class AppMaterialModule { }
