import { UsuariosService } from './usuarios.service';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    verPerfil(request: any): Promise<{
        id: number;
        nombre: string;
        email: string;
        telefono: string;
        nivel_juego: string;
        fecha_registro: Date;
    }>;
    registrarUsuario(registrarUsuarioDto: RegistrarUsuarioDto): Promise<{
        mensaje: string;
        usuario: {
            id: number;
            nombre: string;
            email: string;
            telefono: string;
            nivel_juego: string;
            fecha_registro: Date;
        };
    }>;
    actualizarUsuario(request: any, body: ActualizarUsuarioDto): Promise<{
        mensaje: string;
        usuario: {
            id: number;
            nombre: string;
            email: string;
            telefono: string;
            nivel_juego: string;
            fecha_registro: Date;
        };
    }>;
}
