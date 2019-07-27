import {Body, Controller, Get, Param, Post, Query, Request, Res} from '@nestjs/common';
import {validate} from 'class-validator';
import {Bodega} from './interfaces/bodega';
import {BodegaCreateDto} from './dto/bodega.create.dto';
import {BodegaUpdateDto} from './dto/bodega.update.dto';
import {BodegaService} from './bodega.service';

@Controller('/api/bodega')
export class BodegaController {
    constructor(private readonly _bodegaService: BodegaService) {

    }

    @Get('lista')
    async listaBodegas(
        @Res() res
    ) {
        const arregloBodegas = await this._bodegaService.buscar();
        console.log('Get lista: ', arregloBodegas);
        res.render('bodega/lista-bodegas', {
            arregloBodegas: arregloBodegas
        })

    }

    @Get('crear')
    crearBodega(
        @Res() res,
        @Query('mensaje') mensaje: string,
    ) {
        res.render(
            'bodega/crear-bodega', {
                mensaje: mensaje
            }
        )
    }

    @Post('crear')
    async crearBodegaPost(
        @Body() bodega: Bodega,
        @Res() res,

    ) {
        let bodegaAValidar = new BodegaCreateDto();

        bodegaAValidar.nombre = bodega.nombre;
        bodegaAValidar.direccion = bodega.direccion;
        bodegaAValidar.localidad = bodega.localidad;

        try {

            const errores = await validate(bodegaAValidar);

            if (errores.length > 0) {
                console.error(errores);
                //res.status(400);
                //res.send({mensaje: 'Error', codigo: 400});
                res.redirect('/api/bodega/crear?mensaje=Tienes un error en el formulario');
            } else {

                const respuestaCrear = await this._bodegaService.crearBodega(bodega); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);

                res.redirect('/api/bodega/lista');
            }

        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }

    @Post('eliminar')
    async eliminarBodegaPost(
        @Body() bodega: Bodega,
        @Res() res,
    ) {
        try {

            const respuestaEliminar = await this._bodegaService.eliminarBodega(bodega.idBodega); //promesa

            console.log('Respuesta: ', respuestaEliminar);
            res.redirect('/api/bodega/lista');

        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }

    @Get('editar/:idBodega')
    async editarBodegaGet(
        @Res() res,
        @Param('idBodega') idBodega: string,
        @Query('mensaje') mensaje: string,
        @Body() bodega: Bodega,
    ) {
        const bodegaEncontrado = await this._bodegaService.buscarPorId(Number(idBodega));

        res.render(
            'bodega/editar-bodega', {
                idBod: bodegaEncontrado.idBodega,
            }
        )
    }

    @Post('editar/:idBodega')
    async editarBodegaPost(
        @Param('idBodega') idBodega: string,
        @Body() bodega: Bodega,
        @Res() res,
    ) {
        let bodegaAValidar = new BodegaUpdateDto();

        bodegaAValidar.nombre = bodega.nombre;
        bodegaAValidar.direccion = bodega.direccion;
        bodegaAValidar.localidad = bodega.localidad;

        console.log('bodegaAValidar post: ', idBodega, bodega, bodegaAValidar, bodegaAValidar.idBodega, bodega.idBodega);

        try {
            const errores = await validate(bodegaAValidar);

            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/bodega/editar/'+bodega.idBodega+'?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaEditar = await this._bodegaService
                    .actualizarBodega(Number(idBodega), bodega); // Promesa

                console.log('RESPUESTA EDITAR: ', respuestaEditar);

                res.redirect('/api/bodega/lista');
            }
        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }


    @Post('/buscar')
    async postBuscarBodega(
        @Res() res,
        //@Body('username') username: string,
        @Body('busquedaBodega') bodega: string,
        @Request() request
    ) {
        //const cookieSegura = request.signedCookies;
        const bodegaEncontrada = await this._bodegaService.buscarBodega(bodega);

        var arregloBodegas = [bodegaEncontrada];

        if(bodega!= "" && bodegaEncontrada!=undefined){
            res.render('bodega/lista-bodegas', {
                arregloBodegas: arregloBodegas/*,username:cookieSegura.username*/

            });
            //res.redirect('/api/usuario/lista');
        }else {
            res.redirect('/api/bodega/lista');
        }
    }







}