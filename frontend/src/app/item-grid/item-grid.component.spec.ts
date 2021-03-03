import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { BackendServiceMock } from 'src/app/mocks/backend.service.mock.spec';
import { AddButtonModule } from 'src/app/shared/add-button/add-button.module';

import { ItemGridComponent } from './item-grid.component';

describe('ItemGridComponent', () => {
  let component: ItemGridComponent;
  let fixture: ComponentFixture<ItemGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGridComponent ],
      imports: [RouterTestingModule.withRoutes([]), AddButtonModule, MatDialogModule],
      providers: [BackendServiceMock]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
