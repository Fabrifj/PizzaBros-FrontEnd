import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArmadaComprasComponent } from './lista-armada-compras.component';

describe('ListaArmadaComprasComponent', () => {
  let component: ListaArmadaComprasComponent;
  let fixture: ComponentFixture<ListaArmadaComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaArmadaComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArmadaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
