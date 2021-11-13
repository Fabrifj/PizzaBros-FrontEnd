import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionCategoriasComponent } from './creacion-categorias.component';

describe('CreacionCategoriasComponent', () => {
  let component: CreacionCategoriasComponent;
  let fixture: ComponentFixture<CreacionCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
