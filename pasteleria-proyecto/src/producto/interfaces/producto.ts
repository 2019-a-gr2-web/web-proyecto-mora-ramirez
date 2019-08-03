export interface Producto {
  idProducto?: number;
  nombreProducto: string;
  detalle: string;
  tipo?: 'Venta'|'Consumo';
  tipoEnvoltura?: string;
  precio?: string;
  tamanio?: number;
  cantidad?: number;
}
