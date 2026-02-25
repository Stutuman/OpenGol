import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
export declare class UsuariosService {
    private usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    registrar(datosUsuario: any): Promise<{
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
