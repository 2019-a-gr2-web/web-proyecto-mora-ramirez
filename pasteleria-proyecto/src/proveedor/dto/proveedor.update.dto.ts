import {IsDate, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches} from 'class-validator';

export class ProveedorUpdateDto {

  @IsEmpty()
  idProveedor:number;

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
