import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCreationPageComponent } from './collection-creation-page.component';

describe('CollectionCreationPageComponent', () => {
  let component: CollectionCreationPageComponent;
  let fixture: ComponentFixture<CollectionCreationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionCreationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
