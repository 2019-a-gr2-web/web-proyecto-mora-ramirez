import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from "./usuario/usuario.module";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ClienteModule} from './cliente/cliente.module';
import {BodegaModule} from './bodega/bodega.module';
import { ProveedorModule } from './proveedor/proveedor.module';

@Module({
  imports: [
      UsuarioModule,
      ClienteModule,
      BodegaModule,
      ProveedorModule,
    TypeOrmModule.forRoot({
      name: 'default', //Nombre cadena de conexion por defecto de TYPEORM
      type: 'mysql',
      host: '192.168.99.100',
      port: 32769,
      username: 'root',
      password: 'root',
      database: 'pasteleria',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    //extra:{
    /* insecureAuth:true,*/
    //}
      dropSchema: false
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
