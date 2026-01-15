import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosEvento } from './pagos-evento';

describe('PagosEvento', () => {
  let component: PagosEvento;
  let fixture: ComponentFixture<PagosEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosEvento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosEvento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
