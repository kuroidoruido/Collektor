import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { BackendServiceMock } from 'src/app/mocks/backend.service.mock.spec';
import { CommonFormElementsModule } from 'src/app/shared/common-form-elements.module';
import { CollektionFormComponent } from '../collektion-form/collektion-form.component';
import { EditCollektionComponent } from './edit-collektion.component';

describe('EditCollektionComponent', () => {
  let component: EditCollektionComponent;
  let fixture: ComponentFixture<EditCollektionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCollektionComponent, CollektionFormComponent],
      imports: [MatSnackBarModule, RouterTestingModule.withRoutes([]), NoopAnimationsModule, MatIconModule, CommonFormElementsModule, MatSelectModule],
      providers: [BackendServiceMock]
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
