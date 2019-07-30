export interface Proveedor {
  idProveedor?: number;
  cedulaP: string;
  nombreP: string;
  apellidoP: string;
  telefonoP?: string;
  correoP?: string;
  direccionP?: string;
  estado: 'activo'|'inactivo';
}
