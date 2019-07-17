export interface Usuario {
    id?: number;
    username: string;
    password: string;
    tipo: 'administrador'|'cliente';
}