import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
export declare class UsuariosService {
    private usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
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
    s: any;
}
