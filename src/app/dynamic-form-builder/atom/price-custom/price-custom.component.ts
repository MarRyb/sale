import { DictionaryService } from './../../../core/services/dictionary.service';
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

  public field: any = {
    type: 'price',
    name: 'Цена товара',
    id: 'type',
    value: [
      { key: '0', name: 'Обмен' },
      { key: '1', name: 'Продажа за',
        params: {
          input: {
            type: 'input',
            id: 'price',
            name: 'Цена'
          },
          select: {
            type: 'select',
            id: 'currency',
            name: 'грн',
            value: [{ value: 'uan', label: 'грн.' },]
          },
          checkbox: {
            type: 'checkbox',
            value: [
              { value: 'bargain', label: 'Возможен торг' }
            ]
          }
        }
      },
      { key: '2', name: 'Цена договорная' }
    ]
  };

  @Input() form: FormGroup;

  constructor(
    private dictionary: DictionaryService
  ) {}
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }

  ngOnInit() {
    this.dictionary.getCurrency().subscribe(
      (data) => {
        const currencies = data.map((i) => {
          return { value: i.id, label: i.name };
        });
        this.field.value[1].params.select.value = currencies;
      }
    );
  }

}
