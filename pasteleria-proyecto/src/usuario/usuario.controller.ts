import {Body, Controller, Get, Param, Post, Query, Res} from '@nestjs/common';
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
            'usuario/crear-editar', {
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
                //res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario&campos=nombre');
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
    editarUsuario(
        @Res() res,
        @Param() param,
        @Query('mensaje') mensaje: string,
    ) {
        res.render(
            'usuario/crear-editar', {
                mensaje: mensaje
            }
        )
    }

    @Post('editar')
    async editarUsuarioPost(
        @Body() usuario: Usuario,
        @Res() res,
    ) {
        let usuarioAValidar = new UsuarioUpdateDto();

        usuarioAValidar.username = usuario.username;
        usuarioAValidar.password = usuario.password;
        usuarioAValidar.tipo = usuario.tipo;

        try {
            const errores = await validate(usuarioAValidar);

            if (errores.length > 0) {
                console.error(errores);
                //res.redirect('/api/traguito/editar/'+trago.id+'?mensaje=Tienes un error en el formulario&campos=nombre');
            } else {
                const respuestaEditar = await this._usuarioService
                    .actualizarUsuario(usuario.id, usuario); // Promesa

                console.log('RESPUESTA: ', respuestaEditar);

                res.redirect('/api/usuario/lista');
            }
        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }

}