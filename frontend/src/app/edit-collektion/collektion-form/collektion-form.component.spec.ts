import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollektionFormComponent } from './collektion-form.component';

describe('CollektionFormComponent', () => {
  let component: CollektionFormComponent;
  let fixture: ComponentFixture<CollektionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollektionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollektionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
