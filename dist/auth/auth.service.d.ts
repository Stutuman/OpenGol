import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from 'src/usuarios/dto/login-usuario.dto';
export declare class AuthService {
    private usuariosService;
    private jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    login(datosLogin: LoginUsuarioDto): Promise<{
        mensaje: string;
        usuario: {
            id: number;
            nombre: string;
            email: string;
            telefono: string;
            nivel_juego: string;
            fecha_registro: Date;
        };
        access_token: string;
    }>;
}
