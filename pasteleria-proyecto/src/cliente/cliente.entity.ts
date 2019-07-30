import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('cliente')
export class ClienteEntity {

    @PrimaryGeneratedColumn()
    idCliente: number;

    @Column(
        {
            name: 'cedula',
            type: 'varchar',
            length: 15,
        }
    )
    cedula: string;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 30,
        }
    )
    nombre: string;

    @Column(
        {
            name: 'apellido',
            type: 'varchar',
            length: 30,
        }
    )
    apellido: string;

    @Column(
        {
            name: 'telefono',
            type: 'varchar',
            length: 20,
        }
    )
    telefono: string;

    @Column(
        {
            name: 'correo',
            type: 'varchar',
            length: 50,
        }
    )
    correo: string;

    @Column(
        {
            name: 'direccion',
            type: 'varchar',
            length: 50,
        }
    )
    direccion: string;

    @Column(
        {
            name: 'estado',
            type: 'varchar',
            length: 20,
        }
    )
    estado: 'activo'|'inactivo';

}