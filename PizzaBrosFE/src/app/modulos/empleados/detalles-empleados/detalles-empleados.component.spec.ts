import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEmpleadosComponent } from './detalles-empleados.component';

describe('DetallesEmpleadosComponent', () => {
  let component: DetallesEmpleadosComponent;
  let fixture: ComponentFixture<DetallesEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
