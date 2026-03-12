import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthController } from './auth.controller';

@Module({
  imports:[
    UsuariosModule,
    JwtModule.register({
      global:true,//esto permite usar JTW en cualquier parte del proyecto
      secret:process.env.JWT_SECRET || 'MiSecreteOpenGol2026',
      signOptions:{ expiresIn:'1h'},//vence en una hora
    })
  ],
  providers: [AuthService],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
