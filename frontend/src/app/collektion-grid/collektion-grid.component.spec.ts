import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendServiceMock } from 'src/app/mocks/backend.service.mock.spec';

import { CollektionGridComponent } from './collektion-grid.component';

describe('CollektionGridComponent', () => {
  let component: CollektionGridComponent;
  let fixture: ComponentFixture<CollektionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollektionGridComponent ],
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
