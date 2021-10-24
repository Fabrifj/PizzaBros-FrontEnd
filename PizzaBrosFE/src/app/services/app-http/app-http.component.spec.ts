import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHttpComponent } from './app-http.component';

describe('AppHttpComponent', () => {
  let component: AppHttpComponent;
  let fixture: ComponentFixture<AppHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHttpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
