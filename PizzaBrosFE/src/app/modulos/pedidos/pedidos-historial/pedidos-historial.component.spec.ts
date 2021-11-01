import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosHistorialComponent } from './pedidos-historial.component';

describe('PedidosHistorialComponent', () => {
  let component: PedidosHistorialComponent;
  let fixture: ComponentFixture<PedidosHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
