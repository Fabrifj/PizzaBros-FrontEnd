import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProductosCategoriaComponent } from './mostrar-productos-categoria.component';

describe('MostrarProductosCategoriaComponent', () => {
  let component: MostrarProductosCategoriaComponent;
  let fixture: ComponentFixture<MostrarProductosCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarProductosCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarProductosCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
