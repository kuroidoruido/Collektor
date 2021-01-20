import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';

import { CollektionTileComponent } from './collektion-tile.component';

describe('CollektionTileComponent', () => {
  let component: CollektionTileComponent;
  let fixture: ComponentFixture<CollektionTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollektionTileComponent],
      imports: [MatCardModule, RouterTestingModule.withRoutes([])]
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
