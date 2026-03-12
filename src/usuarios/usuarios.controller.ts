import { Controller, Post, Body,Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
@Controller('api/usuarios') 
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  registrarUsuario(@Body() registrarUsuarioDto: RegistrarUsuarioDto) {

    return this.usuariosService.registrar(registrarUsuarioDto); 
  }

}