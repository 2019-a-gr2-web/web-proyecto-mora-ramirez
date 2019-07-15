import {Body, Controller, Get, HttpCode, Param, Post, Query, Request, Res, Session} from '@nestjs/common';
import {AppService} from './app.service';
import {UsuarioService} from './usuario/usuario.service';
import * as Joi from '@hapi/joi';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly _usuarioService: UsuarioService
    ) {
    }

    @Get('home')
    home(@Res() res) {
        res.render('home');
    }

    @Get('nosotros')
    nosotros(@Res() res) {
        res.render('nosotros');
    }

    @Get('pasteles')
    pasteles(@Res() res) {
        res.render('pasteles');
    }

    @Get('gelatinas')
    gelatinas(@Res() res) {
        res.render('gelatinas');
    }

    @Get('login')
    getLogin(@Res() res) {
        res.render('login');
    }

    @Post('login')
    @HttpCode(200)
    async postLogin(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res() res,
        @Session() sesion
    ) {
        const respuesta = await this._usuarioService
            .autenticar(username, password);

        //console.log(sesion);

        if (respuesta) {
            //sesion.usuario = username;
            res.redirect('menu');
        } else {
            res.redirect('login');
        }

    }

    @Get('logout')
    logout(
        @Res() res,
        @Session() session,
    ) {
        session.username = undefined;
        session.destroy();
        res.redirect('home');
    }

    @Get('menu')
    getMenu(@Res() res) {
        res.render('menu');
    }

    @Get('usuario')
    getUsuario(@Res() res) {
        res.render('usuario');
    }

}
