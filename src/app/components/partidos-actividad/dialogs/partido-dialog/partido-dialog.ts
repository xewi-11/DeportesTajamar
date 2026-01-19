import { Component, Inject } from '@angular/core';
import { Partido } from '../../../../models/partido';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipo } from '../../../../models/equipo';
@Component({
  selector: 'app-partido-dialog',
  imports: [],
  templateUrl: './partido-dialog.html',
  styleUrl: './partido-dialog.css',
})
export class PartidoDialog {
  modo!: 'crear' | 'editar';
  equipos!: Equipo[];
  partido?: Partido;
}

@Component({
  selector: 'app-partido-dialog',
  templateUrl: './partido-dialog.html'
})
export class PartidoDialogComponent {

  form: FormGroup;
  esEdicion: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PartidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartidoDialog
  ) {
    this.esEdicion = data.modo === 'editar';

    this.form = this.fb.group({
      idEquipoLocal: [
        data.partido?.idEquipoLocal ?? null,
        Validators.required
      ],
      puntosLocal: [
        data.partido?.puntosLocal ?? 0,
        [Validators.required, Validators.min(0)]
      ],
      idEquipoVisitante: [
        data.partido?.idEquipoVisitante ?? null,
        Validators.required
      ],
      puntosVisitante: [
        data.partido?.puntosVisitante ?? 0,
        [Validators.required, Validators.min(0)]
      ]
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const resultado: Partido = {
      ...this.data.partido,   // conserva idPartidoResultado en edición
      ...this.form.value
    };

    this.dialogRef.close(resultado);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
