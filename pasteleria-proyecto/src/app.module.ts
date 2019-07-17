import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from "./usuario/usuario.module";
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
      UsuarioModule,
    TypeOrmModule.forRoot({
      name: 'default', //Nombre cadena de conexion por defecto de TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
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
