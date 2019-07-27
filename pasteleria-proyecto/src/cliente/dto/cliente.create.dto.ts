import {IsDate, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches} from 'class-validator';

export class ClienteCreateDto {

    @IsEmpty()
    idBodega:number;

    @IsNotEmpty()
    @IsString()
    @Length(10,15)
    @Matches(/^[_0-9-]+$/,{
        message: "El numero de cedula debe contener unicamente numeros"
    })
    cedula: string;

    @IsNotEmpty()
    @IsString()
    /*@Matches(/^[a-zA-Z\s]+$/,{
        message: "NOMBRE: Solo se permiten letras y espacios"
    })*/
    nombre: string;

    @IsNotEmpty()
    @IsString()
    /*@Matches(/^[a-zA-Z\s]+$/,{
        message: "APELLIDO: Solo se permiten letras y espacios"
    })*/
    apellido: string;


    @IsString()
    telefono: string;


    @IsString()
    @IsEmail({},{
        message: "CORREO: formato no valido"
    })
    correo: string;


    @IsString()
    direccion: string;

    @IsNotEmpty()
    @IsString()
    estado: 'activo'|'inactivo';

}