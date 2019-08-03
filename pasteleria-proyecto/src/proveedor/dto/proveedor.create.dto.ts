import {IsEmail, IsEmpty, IsNotEmpty, IsString, Length, Matches} from 'class-validator';

export class ProveedorCreateDto {

  @IsEmpty()
  idProveedor:number;

  @IsNotEmpty()
  @IsString()
  @Length(10,15)
  @Matches(/^[_0-9-]+$/,{
    message: "El numero de cedula debe contener unicamente numeros"
  })
  cedulaP: string;

  @IsNotEmpty()
  @IsString()
  nombreP: string;

  @IsNotEmpty()
  @IsString()
  apellidoP: string;


  @IsString()
  telefonoP: string;


  @IsString()
  @IsEmail({},{
    message: "CORREO: formato no valido"
  })
  correoP: string;


  @IsString()
  direccionP: string;

  @IsNotEmpty()
  @IsString()
  estado: 'activo'|'inactivo';

}
