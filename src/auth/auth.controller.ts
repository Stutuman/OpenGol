import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from '../usuarios/dto/login-usuario.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  iniciarSesion(@Body() body: LoginUsuarioDto) {
    return this.authService.login(body);
  }
}