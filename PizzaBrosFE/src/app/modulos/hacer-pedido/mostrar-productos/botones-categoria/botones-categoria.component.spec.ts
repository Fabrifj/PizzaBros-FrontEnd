import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesCategoriaComponent } from './botones-categoria.component';

describe('BotonesCategoriaComponent', () => {
  let component: BotonesCategoriaComponent;
  let fixture: ComponentFixture<BotonesCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonesCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
