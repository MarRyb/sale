import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagmentItemComponent } from './category-managment-item.component';

describe('CategoryManagmentItemComponent', () => {
  let component: CategoryManagmentItemComponent;
  let fixture: ComponentFixture<CategoryManagmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryManagmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManagmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
