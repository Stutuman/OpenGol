import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  // Esta es la función que hace el trabajo
  async registrar(datosUsuario: any) {
    try {
      const { nombre, email, password, telefono } = datosUsuario;

      // 1. Encriptamos
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // 2. Armamos el objeto con el molde (TypeORM lo hace seguro contra inyecciones SQL)
      const nuevoUsuario = this.usuarioRepository.create({
        nombre,
        email,
        password_hash: passwordHash,
        telefono,
      });

      // 3. Guardamos en la base de datos
      await this.usuarioRepository.save(nuevoUsuario);

      // 4. Por seguridad, le quitamos la contraseña al objeto antes de devolverlo a la web
      const { password_hash, ...usuarioSeguro } = nuevoUsuario;

      return {
        mensaje: '¡Usuario registrado con éxito para jugar!',
        usuario: usuarioSeguro
      };

    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Hubo un error al registrar el usuario');
    }
  }
}