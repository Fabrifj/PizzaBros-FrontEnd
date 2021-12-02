import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnsSeleccionadosComponent } from './btns-seleccionados.component';

describe('BtnsSeleccionadosComponent', () => {
  let component: BtnsSeleccionadosComponent;
  let fixture: ComponentFixture<BtnsSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnsSeleccionadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnsSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
