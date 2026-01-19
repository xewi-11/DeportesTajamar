import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoDialog } from './partido-dialog';

describe('PartidoDialog', () => {
  let component: PartidoDialog;
  let fixture: ComponentFixture<PartidoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
