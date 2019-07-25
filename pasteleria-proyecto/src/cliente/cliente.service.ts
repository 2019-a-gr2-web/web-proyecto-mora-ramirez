import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import {Cliente} from './interfaces/cliente';
import {ClienteEntity} from './cliente.entity';

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(ClienteEntity)
        private readonly _clienteRepository:
            Repository<ClienteEntity>
    ) {
    }

    async crearCliente(nuevoCliente: Cliente): Promise<Cliente> {
        const clienteEntidad = this._clienteRepository.create(nuevoCliente);
        const clienteCreado = await this._clienteRepository.save(clienteEntidad); //promesa
        return clienteCreado;
    }

    actualizarCliente(idCliente: number, clienteActualizado: Cliente): Promise<UpdateResult> {
        //usuarioActualizado.id = idUsuario;
        //const usuarioEntidad = this._usuarioRepository.create(nuevoUsuario);
        const id = idCliente;
        console.log('Cliente actualizado: ', id);
        return this._clienteRepository.update(idCliente, {

            nombre: clienteActualizado.nombre,
            apellido: clienteActualizado.apellido,
            telefono: clienteActualizado.telefono,
            correo: clienteActualizado.correo,
            direccion: clienteActualizado.direccion,
            estado: clienteActualizado.estado
        });
    }

    eliminarCliente(idCliente: number): Promise<DeleteResult> {
        return this._clienteRepository.delete(idCliente);
    }

    buscar(parametrosBusqueda?): Promise<Cliente[]> { //Trago[] o TragosEntity[]
        return this._clienteRepository.find(parametrosBusqueda);
    }

    buscarPorId(idCliente: number): Promise<ClienteEntity> {
        return this._clienteRepository.findOne(idCliente);
    }

    /*buscarUsuario(username?): Promise<Usuario[]> {
        return this._usuarioRepository.find(username)
    }*/

    async buscarCliente(cedula?: string): Promise<ClienteEntity> {
        return this._clienteRepository.findOne({where: {cedula: Like(`%${cedula}%`)}});
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