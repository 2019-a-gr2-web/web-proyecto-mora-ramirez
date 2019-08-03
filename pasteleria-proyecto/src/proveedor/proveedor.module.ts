import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProveedorEntity} from './proveedor.entity';
import {ProveedorController} from './proveedor.controller';
import {ProveedorService} from './proveedor.service';

@Module({
  imports: [
    TypeOrmModule
      .forFeature([
        ProveedorEntity
      ])
  ],
  controllers:[
    ProveedorController
  ],
  providers: [
    ProveedorService
  ],
  exports: [
    ProveedorService
  ]
})
export class ProveedorModule {

}
