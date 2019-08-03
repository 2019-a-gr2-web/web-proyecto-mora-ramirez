import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import {Proveedor} from './interfaces/proveedor';
import {ProveedorEntity} from './proveedor.entity';

@Injectable()
export class ProveedorService {

  constructor(
    @InjectRepository(ProveedorEntity)
    private readonly _proveedorRepository:
      Repository<ProveedorEntity>
  ) {
  }

  async crearProveedor(nuevoProveedor: Proveedor): Promise<Proveedor> {
    const proveedorEntidad = this._proveedorRepository.create(nuevoProveedor);
    const proveedorCreado = await this._proveedorRepository.save(proveedorEntidad); //promesa
    return proveedorCreado;
  }

  actualizarProveedor(idProveedor: number, proveedorActualizado: Proveedor): Promise<UpdateResult> {
    const id = idProveedor;
    console.log('Proveedor actualizado: ', id);
    return this._proveedorRepository.update(idProveedor, {

      nombreP: proveedorActualizado.nombreP,
      apellidoP: proveedorActualizado.apellidoP,
      telefonoP: proveedorActualizado.telefonoP,
      correoP: proveedorActualizado.correoP,
      direccionP: proveedorActualizado.direccionP,
      estado: proveedorActualizado.estado,
    });
  }

  eliminarProveedor(idProveedor: number): Promise<DeleteResult> {
    return this._proveedorRepository.delete(idProveedor);
  }

  buscar(parametrosBusqueda?): Promise<Proveedor[]> {
    return this._proveedorRepository.find(parametrosBusqueda);
  }

  buscarPorId(idProveedor: number): Promise<ProveedorEntity> {
    return this._proveedorRepository.findOne(idProveedor);
  }

  async buscarProveedor(cedulaP?: string): Promise<ProveedorEntity> {
    return this._proveedorRepository.findOne({where: {cedulaP: Like(`%${cedulaP}%`)}});
  }

}
