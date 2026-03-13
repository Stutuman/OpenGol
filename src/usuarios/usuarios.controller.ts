import { Controller, Post, Body, Patch, Param, ParseIntPipe, UseGuards,Get,Req, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('api/usuarios') 
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @UseGuards(AuthGuard)
  @Get('perfil')
  async verPerfil(@Req() request) {
    // El Guard metió el ID del usuario en request.user.sub
    const idUsuario = request.user.sub;
    return this.usuariosService.obtenerPerfil(idUsuario);
  }

  @Post('registro')
  registrarUsuario(@Body() registrarUsuarioDto: RegistrarUsuarioDto) {

    return this.usuariosService.registrar(registrarUsuarioDto); 
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  actualizarUsuario(
    @Param('id', ParseIntPipe) id: number, 
    @Body() body: ActualizarUsuarioDto
  ) {
    return this.usuariosService.actualizar(id, body);
  }


}