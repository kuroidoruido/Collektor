import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditionPageComponent } from './item-edition-page.component';

describe('ItemEditionPageComponent', () => {
  let component: ItemEditionPageComponent;
  let fixture: ComponentFixture<ItemEditionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
