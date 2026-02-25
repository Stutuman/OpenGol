import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

// Esto define la URL base: http://localhost:3000/api/usuarios
@Controller('api/usuarios') 
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Esto define el final de la URL: /registro
  @Post('registro')
  registrarUsuario(@Body() body: any) {
    // Le pasamos los datos del body al servicio para que haga el trabajo
    return this.usuariosService.registrar(body); 
  }
}