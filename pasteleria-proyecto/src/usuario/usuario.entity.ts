import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'username',
            type: 'varchar',
            length: 50,
        }
    )
    username: string;

    @Column(
        {
            name: 'password',
            type: 'varchar',
            length: 20,
        }
    )
    password: string;

    @Column(
        {
            name: 'tipo',
            type: 'varchar',
            length: 20,
        }
    )
    tipo: 'administrador'|'cliente';

}