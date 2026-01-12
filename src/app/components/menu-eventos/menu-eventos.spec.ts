import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEventos } from './menu-eventos';

describe('MenuEventos', () => {
  let component: MenuEventos;
  let fixture: ComponentFixture<MenuEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEventos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
