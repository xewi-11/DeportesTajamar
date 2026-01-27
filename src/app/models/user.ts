export interface User {
  idUsuario: number;
  usuario: string;
  estadoUsuario: boolean;
  imagen: string;
  email: string;
  idRole: number;
  role: string;
  idCurso: number;
  curso: string;
  fechaInicioCurso: string;
  fechaFinCurso: string;
  idCursosUsuarios: number;
  idCapitanActividad?: number; // Campo opcional para cuando se retorna como capitán
}
