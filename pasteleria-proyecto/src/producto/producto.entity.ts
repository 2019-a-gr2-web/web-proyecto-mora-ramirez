import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('producto')
export class ProductoEntity {

  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column(
    {
      name: 'nombreProducto',
      type: 'varchar',
      length: 50,
    }
  )
  nombreProducto: string;

  @Column(
    {
      name: 'detalle',
      type: 'varchar',
      length: 200,
    }
  )
  detalle: string;

  @Column(
    {
      name: 'tipo',
      type: 'varchar',
      length: 20,
    }
  )
  tipo: 'Venta'|'Consumo';

  @Column(
    {
      name: 'tipoEnvoltura',
      type: 'varchar',
      length: 100,
    }
  )
  tipoEnvoltura: string;

  @Column(
    {
      name: 'precio',
      type: 'varchar',
      length: 10,
    }
  )
  precio: string;

  @Column(
    {
      name: 'tamanio',
      type: 'int',
    }
  )
  tamanio: number;

  @Column(
    {
      name: 'cantidad',
      type: 'int',
    }
  )
  cantidad: number;

}
