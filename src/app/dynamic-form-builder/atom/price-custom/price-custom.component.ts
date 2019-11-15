import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-price-custom',
  templateUrl: './price-custom.component.html',
  styleUrls: ['./price-custom.component.scss',
              '../radio/radio.component.scss'
            ]
})
export class PriceCustomComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: FormGroup;
  constructor() {}
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }

  ngOnInit() {
  }

}
