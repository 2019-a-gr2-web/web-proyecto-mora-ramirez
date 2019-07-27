import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import {Bodega} from './interfaces/bodega';
import {BodegaEntity} from './bodega.entity';

@Injectable()
export class BodegaService {

    constructor(
        @InjectRepository(BodegaEntity)
        private readonly _bodegaRepository:
            Repository<BodegaEntity>
    ) {
    }

    async crearBodega(nuevaBodega: Bodega): Promise<Bodega> {
        const bodegaEntidad = this._bodegaRepository.create(nuevaBodega);
        const bodegaCreada = await this._bodegaRepository.save(bodegaEntidad); //promesa
        return bodegaCreada;
    }

    actualizarBodega(idBodega: number, bodegaActualizada: Bodega): Promise<UpdateResult> {
        //usuarioActualizado.id = idUsuario;
        //const usuarioEntidad = this._usuarioRepository.create(nuevoUsuario);
        const id = idBodega;
        console.log('Bodega actualizada: ', id);
        return this._bodegaRepository.update(idBodega, {

            nombre: bodegaActualizada.nombre,
            direccion: bodegaActualizada.direccion,
            localidad: bodegaActualizada.localidad
        });
    }

    eliminarBodega(idBodega: number): Promise<DeleteResult> {
        return this._bodegaRepository.delete(idBodega);
    }

    buscar(parametrosBusqueda?): Promise<Bodega[]> { //Trago[] o TragosEntity[]
        return this._bodegaRepository.find(parametrosBusqueda);
    }

    buscarPorId(idBodega: number): Promise<BodegaEntity> {
        return this._bodegaRepository.findOne(idBodega);
    }

    /*buscarUsuario(username?): Promise<Usuario[]> {
        return this._usuarioRepository.find(username)
    }*/

    async buscarBodega(nombre?: string): Promise<BodegaEntity> {
        return this._bodegaRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }

//}

    /*
        buscarUsuario(username: string): Promise<Usuario[]> {
            return this._usuarioRepository..filter(
                (usuario)=>{
                    return usuario.username.includes(username);
                }
            );
        }*/

}