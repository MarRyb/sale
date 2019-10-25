import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldManagmentComponent } from './custom-field-managment.component';

describe('CustomFieldManagmentComponent', () => {
  let component: CustomFieldManagmentComponent;
  let fixture: ComponentFixture<CustomFieldManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFieldManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
