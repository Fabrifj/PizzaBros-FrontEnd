import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIngredientesComponent } from './lista-ingredientes.component';

describe('ListaIngredientesComponent', () => {
  let component: ListaIngredientesComponent;
  let fixture: ComponentFixture<ListaIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaIngredientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
