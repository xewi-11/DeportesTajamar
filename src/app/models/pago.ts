export interface Pago {
  id: number;
  idEvento: number;
  fechaEvento: string;
  idEventoActividad: number;
  idActividad: number;
  actividad: string;
  idPrecioActividad: number;
  precioTotal: number;
  idPago: number;
  cantidadPagada: number;
  idCurso: number;
  curso: string;
  estado: string;
}

export interface NuevoPago {
  idCurso: number;
  idPago: number;
  idPrecioActividad: number;
  cantidad: number;
  estado: string;
}