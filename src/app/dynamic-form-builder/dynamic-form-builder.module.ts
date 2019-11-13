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
import { SelectComponent } from './atom/select/select.component';
import { RadioComponent } from './atom/radio/radio.component';
import { PriceCustomComponent } from './atom/price-custom/price-custom.component';

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
    RangeComponent,
    SelectComponent,
    RadioComponent,
    PriceCustomComponent
  ],
  exports: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    InputComponent,
    CheckboxComponent,
    TextareaComponent,
    MultiselectComponent,
    RangeComponent,
    SelectComponent,
    RadioComponent
  ],
  providers: []
})
export class DynamicFormBuilderModule { }
