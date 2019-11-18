import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() changeData = new EventEmitter();
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
            opts[opt.key] = new FormControl(null);
          }
          fieldsCtrls[f.id] = new FormGroup(opts);
        }
      }
    }

    this.form = new FormGroup(fieldsCtrls);

    this.form.valueChanges.subscribe(val => {
      this.changeData.emit(val);
    });
  }

  ngOnInit() {
  }

}
