import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerPedidoComponent } from './hacer-pedido.component';

describe('HacerPedidoComponent', () => {
  let component: HacerPedidoComponent;
  let fixture: ComponentFixture<HacerPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HacerPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
