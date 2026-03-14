import { Injectable, UnauthorizedException,InternalServerErrorException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async obtenerPerfil(id:number ){
    const usuario = await this.usuarioRepository.findOneBy({id})
    if(!usuario){
      throw new NotFoundException('usuario no encontrado')
    }
    const{password_hash,...usuarioSeguro}=usuario;
    return usuarioSeguro;  
  }
  async eliminar(){
    return 'yo elimino el usuario'
  }

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
  async actualizar(id: number, datosActualizar: ActualizarUsuarioDto) {
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({ id });

    if (!usuarioEncontrado) {
      throw new NotFoundException(`El jugador con ID ${id} no existe`);
    }

    // Si el usuario cambia la password, la hasheamos antes de guardar
    if (datosActualizar.password) {
      const saltRounds = 10;
      usuarioEncontrado.password_hash = await bcrypt.hash(datosActualizar.password, saltRounds);
      delete datosActualizar.password; // Limpiamos la clave plana del DTO
    }

    // "Pisamos" los datos viejos con los nuevos
    const usuarioModificado = this.usuarioRepository.merge(usuarioEncontrado, datosActualizar);
    await this.usuarioRepository.save(usuarioModificado);

    const { password_hash, ...usuarioSeguro } = usuarioModificado;
    return {
      mensaje: '¡Perfil actualizado correctamente!',
      usuario: usuarioSeguro,
    };
  }

}