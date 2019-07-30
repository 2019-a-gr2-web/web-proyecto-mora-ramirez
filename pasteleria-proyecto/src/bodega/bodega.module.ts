import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';
import {BodegaEntity} from './bodega.entity';
import {BodegaController} from './bodega.controller';
import {BodegaService} from './bodega.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                BodegaEntity
            ])
    ],
    controllers:[
        BodegaController
    ],
    providers: [
        BodegaService
    ],
    exports: [
        BodegaService
    ]
})
export class BodegaModule {

}