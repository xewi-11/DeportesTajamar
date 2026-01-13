import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesActividad } from './materiales-actividad';

describe('MaterialesActividad', () => {
  let component: MaterialesActividad;
  let fixture: ComponentFixture<MaterialesActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialesActividad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialesActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
