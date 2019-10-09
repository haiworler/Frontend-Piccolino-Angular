import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTabsModule, MatCardModule, MatChipsModule, MatRadioModule } from '@angular/material';

@NgModule({
    'imports': [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatDialogModule,
        MatListModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatCardModule,
        MatChipsModule,
        MatRadioModule
    ],
    'exports': [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatDialogModule,
        MatListModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatCardModule,
        MatChipsModule,
        MatRadioModule
    ],
    'providers': [
        MatDatepickerModule
    ]
})
export class AngularMaterialModule {}