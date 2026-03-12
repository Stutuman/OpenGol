import { IsEmail, MinLength } from "class-validator";
export class LoginUsuarioDto{
    @IsEmail({},{message:'El formato del correo electronico es invalido'})
    email:string;
    @MinLength(6,{message:'La contraseno debe tener al menos 6 caracteres'})
    password:string;
}