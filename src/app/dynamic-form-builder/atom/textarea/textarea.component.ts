import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.id].valid; }
  get isDirty() { return this.form.controls[this.field.id].dirty; }
  constructor() { }

  ngOnInit() {
  }

}
