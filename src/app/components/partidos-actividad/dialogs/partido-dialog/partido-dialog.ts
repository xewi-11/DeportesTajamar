import { Component, Inject } from '@angular/core';
import { Partido } from '../../../../models/partido';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Equipo } from '../../../../models/equipo';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-partido-dialog',
  templateUrl: './partido-dialog.html',
  styleUrls: ['./partido-dialog.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
})
export class PartidoDialogComponent {

  form: FormGroup;
  esEdicion: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PartidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      modo: 'crear' | 'editar';
      equipos: Equipo[];
      partido?: Partido;
    }
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
