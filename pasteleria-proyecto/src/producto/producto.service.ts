import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { ProductoEntity } from './producto.entity';
import { Producto } from './interfaces/producto';

@Injectable()
export class ProductoService {

  constructor(
    @InjectRepository(ProductoEntity)
    private readonly _productoRepository:
      Repository<ProductoEntity>
  ) {
  }

  async crearProducto(nuevoProducto: Producto): Promise<Producto> {
    const productoEntidad = this._productoRepository.create(nuevoProducto);
    const productoCreado = await this._productoRepository.save(productoEntidad); //promesa
    return productoCreado;
  }

  actualizarProducto(idProducto: number, productoActualizado: Producto): Promise<UpdateResult> {
    const id = idProducto;
    console.log('Producto actualizado: ', id);
    return this._productoRepository.update(idProducto, {

      nombreProducto: productoActualizado.nombreProducto,
      detalle: productoActualizado.detalle,
      tipo: productoActualizado.tipo,
      tipoEnvoltura: productoActualizado.tipoEnvoltura,
      precio: productoActualizado.precio,
      tamanio: productoActualizado.tamanio,
      cantidad: productoActualizado.cantidad,
    });
  }

  eliminarProducto(idProducto: number): Promise<DeleteResult> {
    return this._productoRepository.delete(idProducto);
  }

  buscar(parametrosBusqueda?): Promise<Producto[]> {
    return this._productoRepository.find(parametrosBusqueda);
  }

  buscarPorId(idProducto: number): Promise<ProductoEntity> {
    return this._productoRepository.findOne(idProducto);
  }

  async buscarProducto(nombreProducto?: string): Promise<ProductoEntity> {
    return this._productoRepository.findOne({where: {nombreProducto: Like(`%${nombreProducto}%`)}});
  }

}
