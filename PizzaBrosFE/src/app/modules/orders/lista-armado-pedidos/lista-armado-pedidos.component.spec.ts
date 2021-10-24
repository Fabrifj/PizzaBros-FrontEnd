import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArmadoPedidosComponent } from './lista-armado-pedidos.component';

describe('ListaArmadoPedidosComponent', () => {
  let component: ListaArmadoPedidosComponent;
  let fixture: ComponentFixture<ListaArmadoPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaArmadoPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArmadoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
