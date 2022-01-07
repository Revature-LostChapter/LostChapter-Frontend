import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProductModalComponent } from './display-product-modal.component';

describe('DisplayProductModalComponent', () => {
  let component: DisplayProductModalComponent;
  let fixture: ComponentFixture<DisplayProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
