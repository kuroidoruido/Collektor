import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonFormElementsModule } from 'src/app/shared/common-form-elements.module';
import { CollektionFormComponent } from './collektion-form.component';

describe('CollektionFormComponent', () => {
  let component: CollektionFormComponent;
  let fixture: ComponentFixture<CollektionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollektionFormComponent],
      imports: [NoopAnimationsModule, RouterTestingModule.withRoutes([]), MatIconModule, CommonFormElementsModule, MatSelectModule]
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
