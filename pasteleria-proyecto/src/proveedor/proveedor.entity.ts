import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('proveedor')
export class ProveedorEntity {

  @PrimaryGeneratedColumn()
  idProveedor: number;

  @Column(
    {
      name: 'nombreP',
      type: 'varchar',
      length: 50,
    }
  )
  nombreP: string;

  @Column(
    {
      name: 'apellidoP',
      type: 'varchar',
      length: 50,
    }
  )
  apellidoP: string;

  @Column(
    {
      name: 'cedulaP',
      type: 'varchar',
      length: 10,
    }
  )
  cedulaP: string;

  @Column(
    {
      name: 'telefonoP',
      type: 'varchar',
      length: 15,
    }
  )
  telefonoP: string;

  @Column(
    {
      name: 'correoP',
      type: 'varchar',
      length: 50,
    }
  )
  correoP: string;

  @Column(
    {
      name: 'direccionP',
      type: 'varchar',
      length: 100,
    }
  )
  direccionP: string;

  @Column(
    {
      name: 'estado',
      type: 'varchar',
      length: 20,
    }
  )
  estado: 'activo'|'inactivo';

}
