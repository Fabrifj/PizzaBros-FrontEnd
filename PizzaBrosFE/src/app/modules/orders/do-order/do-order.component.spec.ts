import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoOrderComponent } from './do-order.component';

describe('DoOrderComponent', () => {
  let component: DoOrderComponent;
  let fixture: ComponentFixture<DoOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
