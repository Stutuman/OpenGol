import { Controller, Post, Body, Patch, Param, ParseIntPipe, UseGuards,Get,Req, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('usuarios')
@Controller('api/usuarios') 
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @ApiBearerAuth('access-token')
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
 @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch('perfil')
  actualizarUsuario(
    @Req() request, 
    @Body() body: ActualizarUsuarioDto
  ) {
    const idUsuario = request.user.sub; 
    return this.usuariosService.actualizar(idUsuario, body);
  }


}