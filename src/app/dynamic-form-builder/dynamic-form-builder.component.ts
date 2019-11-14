import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  form: FormGroup;
  constructor() { }
  ngOnChanges(changes: any) {
    const fieldsCtrls = {};
    if (typeof changes.fields.currentValue !== 'undefined' && changes.fields.currentValue !== null) {
      for (const f of changes.fields.currentValue) {
        if (f.type !== 'checkbox') {
          fieldsCtrls[f.id] = new FormControl(f.value.value || '', Validators.required);
        } else {
          const opts = {};
          for (const opt of f.value) {
            opts[opt.key] = new FormControl(opt.value);
          }
          fieldsCtrls[f.id] = new FormGroup(opts);
        }
      }
    }

    this.form = new FormGroup(fieldsCtrls);
  }
  ngOnInit() {

  }
}
