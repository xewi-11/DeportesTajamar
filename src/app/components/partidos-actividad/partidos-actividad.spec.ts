import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosActividad } from './partidos-actividad';

describe('PartidosActividad', () => {
  let component: PartidosActividad;
  let fixture: ComponentFixture<PartidosActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidosActividad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidosActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
