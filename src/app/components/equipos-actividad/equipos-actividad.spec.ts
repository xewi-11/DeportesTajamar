import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposActividad } from './equipos-actividad';

describe('EquiposActividad', () => {
  let component: EquiposActividad;
  let fixture: ComponentFixture<EquiposActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposActividad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquiposActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
