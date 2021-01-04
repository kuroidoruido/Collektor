import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BackendServiceMock } from 'src/app/mocks/backend.service.mock.spec';

import { ItemGridComponent } from './item-grid.component';

describe('ItemGridComponent', () => {
  let component: ItemGridComponent;
  let fixture: ComponentFixture<ItemGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGridComponent ],
      imports: [RouterTestingModule.withRoutes([])],
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
