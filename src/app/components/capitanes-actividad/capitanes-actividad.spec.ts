import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitanesActividad } from './capitanes-actividad';

describe('CapitanesActividad', () => {
  let component: CapitanesActividad;
  let fixture: ComponentFixture<CapitanesActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitanesActividad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapitanesActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
