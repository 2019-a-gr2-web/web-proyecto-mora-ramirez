import {Body, Controller, Get, Param, Post, Query, Request, Res} from '@nestjs/common';

import {validate} from 'class-validator';
import {Cliente} from './interfaces/cliente';
import {ClienteService} from './cliente.service';
import {ClienteCreateDto} from './dto/cliente.create.dto';
import {ClienteUpdateDto} from './dto/cliente.update.dto';

@Controller('/api/cliente')
export class ClienteController {
    constructor(private readonly _clienteService: ClienteService) {

    }

    @Get('lista')
    async listaClientes(
        @Res() res
    ) {
        const arregloClientes = await this._clienteService.buscar();
        console.log('Get lista: ', arregloClientes);
        res.render('cliente/lista-clientes', {
            arregloClientes: arregloClientes
        })

    }

    @Get('crear')
    crearCliente(
        @Res() res,
        @Query('mensaje') mensaje: string,
    ) {
        res.render(
            'cliente/crear-cliente', {
                mensaje: mensaje
            }
        )
    }

    @Post('crear')
    async crearClientePost(
        @Body() cliente: Cliente,
        @Res() res,

    ) {
        let clienteAValidar = new ClienteCreateDto();

        clienteAValidar.cedula = cliente.cedula;
        clienteAValidar.nombre = cliente.nombre;
        clienteAValidar.apellido = cliente.apellido;
        clienteAValidar.telefono = cliente.telefono;
        clienteAValidar.correo = cliente.correo;
        clienteAValidar.direccion = cliente.direccion;
        clienteAValidar.estado = cliente.estado;

        try {

            const errores = await validate(clienteAValidar);

            if (errores.length > 0) {
                console.error(errores);
                //res.status(400);
                //res.send({mensaje: 'Error', codigo: 400});
                res.redirect('/api/cliente/crear?mensaje=Tienes un error en el formulario');
            } else {

                const respuestaCrear = await this._clienteService.crearCliente(cliente); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);

                res.redirect('/api/cliente/lista');
            }

        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }

    @Post('eliminar')
    async eliminarClientePost(
        @Body() cliente: Cliente,
        @Res() res,
    ) {
        try {

            const respuestaEliminar = await this._clienteService.eliminarCliente(cliente.idCliente); //promesa

            console.log('Respuesta: ', respuestaEliminar);
            res.redirect('/api/cliente/lista');

        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }

    @Get('editar/:idCliente')
    async editarClienteGet(
        @Res() res,
        @Param('idCliente') idCliente: string,
        @Query('mensaje') mensaje: string,
        @Body() cliente: Cliente,
    ) {
        const clienteEncontrado = await this._clienteService.buscarPorId(Number(idCliente));

        res.render(
            'cliente/editar-cliente', {
                idCli: clienteEncontrado.idCliente,
            }
        )
    }

    @Post('editar/:idCliente')
    async editarClientePost(
        @Param('idCliente') idCliente: string,
        @Body() cliente: Cliente,
        @Res() res,
    ) {
        let clienteAValidar = new ClienteUpdateDto();

        clienteAValidar.nombre = cliente.nombre;
        clienteAValidar.apellido = cliente.apellido;
        clienteAValidar.telefono = cliente.telefono;
        clienteAValidar.correo = cliente.correo;
        clienteAValidar.direccion = cliente.direccion;
        clienteAValidar.estado = cliente.estado;
        console.log('clienteAValidar post: ', idCliente, cliente, clienteAValidar, clienteAValidar.idCliente, cliente.idCliente);

        try {
            const errores = await validate(clienteAValidar);

            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/cliente/editar/'+cliente.idCliente+'?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaEditar = await this._clienteService
                    .actualizarCliente(Number(idCliente), cliente); // Promesa

                console.log('RESPUESTA EDITAR: ', respuestaEditar);

                res.redirect('/api/cliente/lista');
            }
        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }


    @Post('/buscar')
    async postBuscarCliente(
        @Res() res,
        //@Body('username') username: string,
        @Body('busquedaCliente') cliente: string,
        @Request() request
    ) {
        //const cookieSegura = request.signedCookies;
        const clienteEncontrado = await this._clienteService.buscarCliente(cliente);

        var arregloClientes = [clienteEncontrado];

        if(cliente!= "" && clienteEncontrado!=undefined){
            res.render('cliente/lista-clientes', {
                arregloClientes: arregloClientes/*,username:cookieSegura.username*/

            });
            //res.redirect('/api/usuario/lista');
        }else {
            res.redirect('/api/cliente/lista');
        }
    }







}