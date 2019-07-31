import {Body, Controller, Get, Param, Post, Query, Request, Res} from '@nestjs/common';

import {validate} from 'class-validator';
import { ProductoService } from './producto.service';
import { Producto } from './interfaces/producto';
import { ProductoCreateDto } from './dto/producto.create.dto';
import { ProductoUpdateDto } from './dto/producto.update.dto';


@Controller('/api/producto')
export class ProductoController {
  constructor(private readonly _productoService: ProductoService) {

  }

  @Get('lista')
  async listaProducto(
    @Res() res
  ) {
    const arregloProducto = await this._productoService.buscar();
    console.log('Get lista: ', arregloProducto);
    res.render('producto/lista-producto', {
      arregloProducto: arregloProducto
    })

  }

  @Get('crear')
  crearProducto(
    @Res() res,
    @Query('mensaje') mensaje: string,
  ) {
    res.render(
      'producto/crear-producto', {
        mensaje: mensaje
      }
    )
  }

  @Post('crear')
  async crearProductoPost(
    @Body() producto: Producto,
    @Res() res,

  ) {
    let productoAValidar = new ProductoCreateDto();

    productoAValidar.nombreProducto = producto.nombreProducto;
    productoAValidar.detalle = producto.detalle;
    productoAValidar.tipo = producto.tipo;
    productoAValidar.tipoEnvoltura = producto.tipoEnvoltura;
    productoAValidar.precio = producto.precio;
    productoAValidar.tamanio = producto.tamanio;
    productoAValidar.cantidad = producto.cantidad;

    try {

      const errores = await validate(productoAValidar);

      if (errores.length > 0) {
        console.error(errores);
        res.redirect('/api/producto/crear?mensaje=Tienes un error en el formulario');
      } else {
        const respuestaCrear = await this._productoService.crearProducto(producto); // Promesa
        console.log('RESPUESTA: ', respuestaCrear);
        res.redirect('/api/producto/lista');
      }
    }
    catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500})
    }
  }

  @Post('eliminar')
  async eliminarProductoPost(
    @Body() producto: Producto,
    @Res() res,
  ) {
    try {
      const respuestaEliminar = await this._productoService.eliminarProducto(producto.idProducto); //promesa
      console.log('Respuesta: ', respuestaEliminar);
      res.redirect('/api/producto/lista');
    }
    catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500})
    }
  }

  @Get('editar/:idProducto')
  async editarProductoGet(
    @Res() res,
    @Param('idProducto') idProducto: string,
    @Query('mensaje') mensaje: string,
    @Body() producto: Producto,
  ) {
    const productoEncontrado = await this._productoService.buscarPorId(Number(idProducto));
    res.render(
      'producto/editar-producto', {
        idProducto: productoEncontrado.idProducto,
      }
    )
  }

  @Post('editar/:idProducto')
  async editarProductoPost(
    @Param('idProducto') idProducto: string,
    @Body() producto: Producto,
    @Res() res,
  ) {
    let productoAValidar = new ProductoUpdateDto();

    productoAValidar.nombreProducto = producto.nombreProducto;
    productoAValidar.detalle = producto.detalle;
    productoAValidar.tipo = producto.tipo;
    productoAValidar.tipoEnvoltura = producto.tipoEnvoltura;
    productoAValidar.precio = producto.precio;
    productoAValidar.tamanio = producto.tamanio;
    productoAValidar.cantidad = producto.cantidad;
    console.log('productoAValidar post: ', idProducto, producto, productoAValidar, productoAValidar.idProveedor, producto.idProducto);

    try {
      const errores = await validate(productoAValidar);
      if (errores.length > 0) {
        console.error(errores);
        res.redirect('/api/producto/editar/'+producto.idProducto+'?mensaje=Tienes un error en el formulario');
      } else {
        const respuestaEditar = await this._productoService
          .actualizarProducto(Number(idProducto), producto); // Promesa
        console.log('RESPUESTA EDITAR: ', respuestaEditar);
        res.redirect('/api/producto/lista');
      }
    }
    catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500})
    }
  }

  @Post('/buscar')
  async postBuscarProducto(
    @Res() res,
    @Body('busquedaProducto') nombreProducto: string,
    @Request() request
  ) {
    const productoEncontrado = await this._productoService.buscarProducto(nombreProducto);
    var arregloProducto = [productoEncontrado];
    if(nombreProducto!= "" && productoEncontrado!=undefined){
      res.render('producto/lista-producto', {
        arregloProducto: arregloProducto/*,username:cookieSegura.username*/
      });
      //res.redirect('/api/usuario/lista');
    }else {
      res.redirect('/api/producto/lista');
    }
  }
}
