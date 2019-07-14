import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Repository, UpdateResult} from 'typeorm';
import {UsuarioEntity} from './usuario.entity';
import {Usuario} from './interfaces/usuario';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:
            Repository<UsuarioEntity>
    ) {
    }

    async autenticar(username: string,
                     password: string): Promise<boolean> {

        const respuesta = await this._usuarioRepository.findOne({
            where: {
                username: username,
                password: password
            }
        });


        if (respuesta) {
            return respuesta.password === password;
            //return true;
        } else {
            return false;
        }

    }

    async crearUsuario(nuevoUsuario: Usuario): Promise<Usuario> {
        const usuarioEntidad = this._usuarioRepository.create(nuevoUsuario);
        const usuarioCreado = await this._usuarioRepository.save(usuarioEntidad); //promesa
        return usuarioCreado;
    }

    actualizarUsuario(idUsuario: number, usuarioActualizado: Usuario): Promise<UpdateResult> {
        //usuarioActualizado.id = idUsuario;
        //const usuarioEntidad = this._usuarioRepository.create(nuevoUsuario);
        return this._usuarioRepository.update(idUsuario, {
            username: usuarioActualizado.username,
            password: usuarioActualizado.password,
            tipo: usuarioActualizado.tipo
        });
    }

    eliminarUsuario(idUsuario: number): Promise<DeleteResult> {
        return this._usuarioRepository.delete(idUsuario);
    }

    buscar(parametrosBusqueda?):Promise<Usuario[]>{ //Trago[] o TragosEntity[]
        return this._usuarioRepository.find(parametrosBusqueda);
    }

    buscarUsuario(username: string): Promise<Usuario> {
        return this._usuarioRepository.findOne(
            {
                where:
                    {
                        username: username
                    }
            });
    }

}