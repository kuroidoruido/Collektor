import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollektionTileComponent } from './collektion-tile.component';

describe('CollektionTileComponent', () => {
  let component: CollektionTileComponent;
  let fixture: ComponentFixture<CollektionTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollektionTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollektionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
