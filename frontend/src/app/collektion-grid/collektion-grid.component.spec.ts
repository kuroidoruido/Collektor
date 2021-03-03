import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { BackendServiceMock } from 'src/app/mocks/backend.service.mock.spec';
import { AddButtonModule } from 'src/app/shared/add-button/add-button.module';

import { CollektionGridComponent } from './collektion-grid.component';

describe('CollektionGridComponent', () => {
  let component: CollektionGridComponent;
  let fixture: ComponentFixture<CollektionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollektionGridComponent],
      imports: [RouterTestingModule.withRoutes([]), AddButtonModule, MatDialogModule],
      providers: [BackendServiceMock]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollektionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
