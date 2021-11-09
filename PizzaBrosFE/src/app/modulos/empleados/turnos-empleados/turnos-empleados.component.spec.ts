import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEmpleadosComponent } from './turnos-empleados.component';

describe('TurnosEmpleadosComponent', () => {
  let component: TurnosEmpleadosComponent;
  let fixture: ComponentFixture<TurnosEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
