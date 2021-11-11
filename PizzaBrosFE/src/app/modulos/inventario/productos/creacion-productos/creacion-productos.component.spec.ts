import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionProductosComponent } from './creacion-productos.component';

describe('CreacionProductosComponent', () => {
  let component: CreacionProductosComponent;
  let fixture: ComponentFixture<CreacionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
