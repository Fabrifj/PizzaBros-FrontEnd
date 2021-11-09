import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerCompraComponent } from './hacer-compra.component';

describe('HacerCompraComponent', () => {
  let component: HacerCompraComponent;
  let fixture: ComponentFixture<HacerCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HacerCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
