import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
export declare class UsuariosService {
    private usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    obtenerPerfil(id: number): Promise<{
        id: number;
        nombre: string;
        email: string;
        telefono: string;
        nivel_juego: string;
        fecha_registro: Date;
    }>;
    eliminar(): Promise<string>;
    registrar(datosUsuario: RegistrarUsuarioDto): Promise<{
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
    buscarPorEmail(email: string): Promise<Usuario | null>;
    actualizar(id: number, datosActualizar: ActualizarUsuarioDto): Promise<{
        mensaje: string;
        usuario: {
            id: number;
            nombre: string;
            email: string;
            telefono: string;
            nivel_juego: string;
            fecha_registro: Date;
            password?: string;
        };
    }>;
}
