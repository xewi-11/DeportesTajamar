import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaEventos } from './pantalla-eventos';

describe('PantallaEventos', () => {
  let component: PantallaEventos;
  let fixture: ComponentFixture<PantallaEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaEventos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaEventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
