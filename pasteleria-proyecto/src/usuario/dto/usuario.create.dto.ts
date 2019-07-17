import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches} from 'class-validator';

export class UsuarioCreateDto {

    @IsEmpty()
    id:number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[_a-zA-Z0-9-]+$/)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(5,10)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([A-Za-z0-9]){5,10}$/,{
        message: "El password debe contener al menos una letra minuscula, una mayuscula y un numero, sin caracteres especiales"
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    tipo: 'administrador'|'cliente';

}