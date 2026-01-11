import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuActividades } from './menu-actividades';

describe('MenuActividades', () => {
  let component: MenuActividades;
  let fixture: ComponentFixture<MenuActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuActividades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuActividades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
