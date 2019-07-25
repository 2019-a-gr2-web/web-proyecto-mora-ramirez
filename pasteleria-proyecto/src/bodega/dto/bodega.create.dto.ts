import {IsDate, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches} from 'class-validator';

export class BodegaCreateDto {

    @IsEmpty()
    idBodega:number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsNotEmpty()
    @IsString()
    localidad: string;

}