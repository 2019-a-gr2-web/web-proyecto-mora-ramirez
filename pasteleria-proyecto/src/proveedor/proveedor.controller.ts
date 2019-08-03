import {Body, Controller, Get, Param, Post, Query, Request, Res} from '@nestjs/common';

import {validate} from 'class-validator';
import {Proveedor} from './interfaces/proveedor';
import { ProveedorService } from './proveedor.service';
import { ProveedorCreateDto } from './dto/proveedor.create.dto';
import { ProveedorUpdateDto } from './dto/proveedor.update.dto';


@Controller('/api/proveedor')
export class ProveedorController {
  constructor(private readonly _proveedorService: ProveedorService) {

  }

  @Get('lista')
  async listaProveedores(
    @Res() res
  ) {
    const arregloProveedor = await this._proveedorService.buscar();
    console.log('Get lista: ', arregloProveedor);
    res.render('proveedor/lista-proveedor', {
      arregloProveedor: arregloProveedor
    })

  }

  @Get('crear')
  crearProveedor(
    @Res() res,
    @Query('mensaje') mensaje: string,
  ) {
    res.render(
      'proveedor/crear-proveedor', {
        mensaje: mensaje
      }
    )
  }

  @Post('crear')
  async crearProveedorPost(
    @Body() proveedor: Proveedor,
    @Res() res,

  ) {
    let proveedorAValidar = new ProveedorCreateDto();

    proveedorAValidar.cedulaP = proveedor.cedulaP;
    proveedorAValidar.nombreP = proveedor.nombreP;
    proveedorAValidar.apellidoP = proveedor.apellidoP;
    proveedorAValidar.telefonoP = proveedor.telefonoP;
    proveedorAValidar.correoP = proveedor.correoP;
    proveedorAValidar.direccionP = proveedor.direccionP;
    proveedorAValidar.estado = proveedor.estado;

    try {

      const errores = await validate(proveedorAValidar);

      if (errores.length > 0) {
        console.error(errores);
        res.redirect('/api/proveedor/crear?mensaje=Tienes un error en el formulario');
      } else {
        const respuestaCrear = await this._proveedorService.crearProveedor(proveedor); // Promesa
        console.log('RESPUESTA: ', respuestaCrear);
        res.redirect('/api/proveedor/lista');
      }
    }
    catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500})
    }
  }

  @Post('eliminar')
  async eliminarProveedorPost(
    @Body() proveedor: Proveedor,
    @Res() res,
  ) {
    try {
      const respuestaEliminar = await this._proveedorService.eliminarProveedor(proveedor.idProveedor); //promesa
      console.log('Respuesta: ', respuestaEliminar);
      res.redirect('/api/proveedor/lista');
    }
    catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500})
    }
  }

  @Get('editar/:idProveedor')
  async editarProveedorGet(
    @Res() res,
    @Param('idProveedor') idProveedor: string,
    @Query('mensaje') mensaje: string,
    @Body() proveedor: Proveedor,
  ) {
    const proveedorEncontrado = await this._proveedorService.buscarPorId(Number(idProveedor));
    res.render(
      'proveedor/editar-proveedor', {
        idProveedor: proveedorEncontrado.idProveedor,
      }
    )
  }

  @Post('editar/:idProveedor')
  async editarProveedorPost(
    @Param('idProveedor') idProveedor: string,
    @Body() proveedor: Proveedor,
    @Res() res,
  ) {
    let proveedorAValidar = new ProveedorUpdateDto();

    proveedorAValidar.nombreP = proveedor.nombreP;
    proveedorAValidar.apellidoP = proveedor.apellidoP;
    proveedorAValidar.telefonoP = proveedor.telefonoP;
    proveedorAValidar.correoP = proveedor.correoP;
    proveedorAValidar.direccionP = proveedor.direccionP;
    proveedorAValidar.estado = proveedor.estado;
    console.log('proveedorAValidar post: ', idProveedor, proveedor, proveedorAValidar, proveedorAValidar.idProveedor, proveedor.idProveedor);

    try {
      const errores = await validate(proveedorAValidar);
      if (errores.length > 0) {
        console.error(errores);
        res.redirect('/api/proveedor/editar/'+proveedor.idProveedor+'?mensaje=Tienes un error en el formulario');
      } else {
        const respuestaEditar = await this._proveedorService
          .actualizarProveedor(Number(idProveedor), proveedor); // Promesa
        console.log('RESPUESTA EDITAR: ', respuestaEditar);
        res.redirect('/api/proveedor/lista');
      }
    }
    catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500})
    }
  }

  @Post('/buscar')
  async postBuscarProveedor(
    @Res() res,
    @Body('busquedaProveedor') proveedor: string,
    @Request() request
  ) {
    const proveedorEncontrado = await this._proveedorService.buscarProveedor(proveedor);
    var arregloProveedor = [proveedorEncontrado];
    if(proveedor!= "" && proveedorEncontrado!=undefined){
      res.render('proveedor/lista-proveedor', {
        arregloProveedor: arregloProveedor/*,username:cookieSegura.username*/
      });
      //res.redirect('/api/usuario/lista');
    }else {
      res.redirect('/api/proveedor/lista');
    }
  }
}
