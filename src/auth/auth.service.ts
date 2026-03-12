import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDto } from 'src/usuarios/dto/login-usuario.dto';
@Injectable()
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService
    ){}
    async login(datosLogin: LoginUsuarioDto) {
    const { email, password } = datosLogin;

    // 1. Usamos la función nuevita que creamos en el paso anterior
    const usuarioEncontrado = await this.usuariosService.buscarPorEmail(email);

    if (!usuarioEncontrado) {
      throw new UnauthorizedException('Credenciales inválidas. Revisá tu correo o contraseña.');
    }

    // 2. Comparamos claves
    const laClaveCoincide = await bcrypt.compare(password, usuarioEncontrado.password_hash);
    if (!laClaveCoincide) {
      throw new UnauthorizedException('Credenciales inválidas. Revisá tu correo o contraseña.');
    }

    // 3. Limpiamos y fabricamos el Token
    const { password_hash, ...usuarioSeguro } = usuarioEncontrado;
    const payload = { sub: usuarioEncontrado.id, email: usuarioEncontrado.email };
    const tokenVip = await this.jwtService.signAsync(payload);

    return {
      mensaje: '¡Inicio de sesión exitoso! Bienvenido a openGol.',
      usuario: usuarioSeguro,
      access_token: tokenVip
    };
  }
}
