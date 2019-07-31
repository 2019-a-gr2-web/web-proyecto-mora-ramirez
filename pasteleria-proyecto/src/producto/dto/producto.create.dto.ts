import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches } from 'class-validator';

export class ProductoCreateDto {

  @IsEmpty()
  idProducto:number;

  @IsNotEmpty()
  @IsString()
  nombreProducto: string;

  @IsNotEmpty()
  @IsString()
  detalle: string;


  @IsNotEmpty()
  @IsString()
  tipo: 'Venta'|'Consumo';

  @IsNotEmpty()
  @IsString()
  tipoEnvoltura: string;

  @IsNotEmpty()
  @IsString()
  precio: string;

  @IsNotEmpty()
  @IsString()
  tamanio: number;

  @IsNotEmpty()
  @IsString()
  cantidad: number;

}
