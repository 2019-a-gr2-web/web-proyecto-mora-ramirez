import {Body, Controller, Get, Param, Post, Query, Res, Request} from '@nestjs/common';
import {UsuarioService} from './usuario.service';
import {Usuario} from './interfaces/usuario';
import {validate} from "class-validator";
import {UsuarioCreateDto} from "./dto/usuario.create.dto";
import {UsuarioUpdateDto} from "./dto/usuario.update.dto";

@Controller('/api/usuario')
export class UsuarioController {
    constructor(private readonly _usuarioService: UsuarioService) {

    }

    @Get('lista')
    async listaUsuarios(
        @Res() res
    ) {
        const arregloUsuarios = await this._usuarioService.buscar();
        console.log('Get lista: ', arregloUsuarios);
        res.render('usuario/lista-usuarios', {
            arregloUsuarios: arregloUsuarios
        })

    }

    @Get('crear')
    crearUsuario(
        @Res() res,
        @Query('mensaje') mensaje: string,
    ) {
        res.render(
            'usuario/crear-usuario', {
                mensaje: mensaje
            }
        )
    }

    @Post('crear')
    async crearUsuarioPost(
        @Body() usuario: Usuario,
        @Res() res,

    ) {
        let usuarioAValidar = new UsuarioCreateDto();

        usuarioAValidar.username = usuario.username;
        usuarioAValidar.password = usuario.password;
        usuarioAValidar.tipo = usuario.tipo;

        try {

            const errores = await validate(usuarioAValidar);

            if (errores.length > 0) {
                console.error(errores);
                //res.status(400);
                //res.send({mensaje: 'Error', codigo: 400});
                res.redirect('/api/usuario/crear?mensaje=Tienes un error en el formulario');
            } else {

                const respuestaCrear = await this._usuarioService.crearUsuario(usuario); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);

                res.redirect('/api/usuario/lista');
            }

        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }

    @Post('eliminar')
    async eliminarUsuarioPost(
        @Body() usuario: Usuario,
        @Res() res,
    ) {
        try {
            const respuestaEliminar = await this._usuarioService.eliminarUsuario(usuario.id); //promesa

            console.log('Respuesta: ', respuestaEliminar);
            res.redirect('/api/usuario/lista');

        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }

    @Get('editar/:id')
    async editarUsuarioGet(
        @Res() res,
        @Param('id') id: string,
        @Query('mensaje') mensaje: string,
        @Body() usuario: Usuario,
    ) {
        const usuarioEncontrado = await this._usuarioService.buscarPorId(Number(id));

        res.render(
            'usuario/editar-usuario', {
                idUsuario: usuarioEncontrado.id,
            }
        )
    }

    @Post('editar/:id')
    async editarUsuarioPost(
        @Param('id') id: string,
        @Body() usuario: Usuario,
        @Res() res,
    ) {
        let usuarioAValidar = new UsuarioUpdateDto();

        usuarioAValidar.username = usuario.username;
        usuarioAValidar.password = usuario.password;
        usuarioAValidar.tipo = usuario.tipo;
        console.log('usuarioAvalidar post: ', id, usuario, usuarioAValidar, usuarioAValidar.id, usuario.id);

        try {
            const errores = await validate(usuarioAValidar);

            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/usuario/editar/'+usuario.id+'?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaEditar = await this._usuarioService
                    .actualizarUsuario(Number(id), usuario); // Promesa

                console.log('RESPUESTA EDITAR: ', respuestaEditar);

                res.redirect('/api/usuario/lista');
            }
        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }


    @Post('/buscar')
    async postBuscarUsuario(
        @Res() res,
        //@Body('username') username: string,
        @Body('busquedaUsuario') usuario: string,
        @Request() request
    ) {
        //const cookieSegura = request.signedCookies;
        const usuarioEncontrado = await this._usuarioService.buscarUsuario(usuario);

        var arregloUsuarios = [usuarioEncontrado];

        if(usuario!= "" && usuarioEncontrado!=undefined){
            res.render('usuario/lista-usuarios', {
                arregloUsuarios: arregloUsuarios/*,username:cookieSegura.username*/

            });
            //res.redirect('/api/usuario/lista');
        }else {
            res.redirect('/api/usuario/lista');
        }
    }







}