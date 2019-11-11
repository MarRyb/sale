import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { InputComponent } from './atom/input/input.component';
import { CheckboxComponent } from './atom/checkbox/checkbox.component';
import { TextareaComponent } from './atom/textarea/textarea.component';
import { MultiselectComponent } from './atom/multiselect/multiselect.component';
import { RangeComponent } from './atom/range/range.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    InputComponent,
    CheckboxComponent,
    TextareaComponent,
    MultiselectComponent,
    RangeComponent
  ],
  exports: [DynamicFormBuilderComponent],
  providers: []
})
export class DynamicFormBuilderModule { }
