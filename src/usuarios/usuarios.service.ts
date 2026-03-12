import { Injectable, UnauthorizedException,InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async registrar(datosUsuario: RegistrarUsuarioDto) {
    try {
      const { nombre, email, password, telefono } = datosUsuario;

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const nuevoUsuario = this.usuarioRepository.create({
        nombre,
        email,
        password_hash: passwordHash,
        telefono,
      });

      await this.usuarioRepository.save(nuevoUsuario);

      const { password_hash, ...usuarioSeguro } = nuevoUsuario;

      return {
        mensaje: '¡Usuario registrado con éxito para jugar!',
        usuario: usuarioSeguro
      };

    } catch (error) {
      console.error(error);
      //23505 error devuelo por la base de datos
      if (error.code === '23505') {
        throw new ConflictException('Este correo electrónico ya está registrado en openGol. ¡Intentá iniciar sesión!');
      }
      throw new InternalServerErrorException('Hubo un error al registrar el usuario');
    }
  }
  async buscarPorEmail(email:string){
    return this.usuarioRepository.findOne({
      where:{email:email}
    })
  }
  s
}