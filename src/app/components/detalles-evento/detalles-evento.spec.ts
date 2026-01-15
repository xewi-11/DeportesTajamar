import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEvento } from './detalles-evento';

describe('DetallesEvento', () => {
  let component: DetallesEvento;
  let fixture: ComponentFixture<DetallesEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesEvento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesEvento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
