import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReusableComponent } from './tabla-reusable.component';

describe('TablaReusableComponent', () => {
  let component: TablaReusableComponent;
  let fixture: ComponentFixture<TablaReusableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReusableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReusableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
