export interface Cliente {
    idCliente?: number;
    cedula: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
    estado: 'activo'|'inactivo';
}