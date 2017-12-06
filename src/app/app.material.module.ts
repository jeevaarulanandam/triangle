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
  MatInputModule,
  MatAutocompleteModule,
  MatTabsModule

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
    MatInputModule,
    MatAutocompleteModule,
    MatTabsModule
  ],
  
  exports: [
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTabsModule

  ],
  declarations: []
})
export class AppMaterialModule { }
