import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarIngredientesComponent } from './mostrar-ingredientes.component';

describe('MostrarIngredientesComponent', () => {
  let component: MostrarIngredientesComponent;
  let fixture: ComponentFixture<MostrarIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarIngredientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
