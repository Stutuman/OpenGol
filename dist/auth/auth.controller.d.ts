import { AuthService } from './auth.service';
import { LoginUsuarioDto } from '../usuarios/dto/login-usuario.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    iniciarSesion(body: LoginUsuarioDto): Promise<{
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
