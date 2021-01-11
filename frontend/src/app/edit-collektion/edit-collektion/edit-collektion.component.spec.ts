import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollektionComponent } from './edit-collektion.component';

describe('EditCollektionComponent', () => {
  let component: EditCollektionComponent;
  let fixture: ComponentFixture<EditCollektionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCollektionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollektionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
