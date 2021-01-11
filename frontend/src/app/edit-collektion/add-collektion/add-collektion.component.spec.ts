import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollektionComponent } from './add-collektion.component';

describe('AddCollektionComponent', () => {
  let component: AddCollektionComponent;
  let fixture: ComponentFixture<AddCollektionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollektionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollektionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
