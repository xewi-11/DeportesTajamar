import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesEvento } from './actividades-evento';

describe('ActividadesEvento', () => {
  let component: ActividadesEvento;
  let fixture: ComponentFixture<ActividadesEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesEvento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesEvento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
