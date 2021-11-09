import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SueldosEmpleadosComponent } from './sueldos-empleados.component';

describe('SueldosEmpleadosComponent', () => {
  let component: SueldosEmpleadosComponent;
  let fixture: ComponentFixture<SueldosEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SueldosEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SueldosEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
