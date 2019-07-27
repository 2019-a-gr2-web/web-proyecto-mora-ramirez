import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('bodega')
export class BodegaEntity {

    @PrimaryGeneratedColumn()
    idBodega: number;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 50,
        }
    )
    nombre: string;

    @Column(
        {
            name: 'direccion',
            type: 'varchar',
            length: 200,
        }
    )
    direccion: string;

    @Column(
        {
            name: 'localidad',
            type: 'varchar',
            length: 50,
        }
    )
    localidad: string;

}