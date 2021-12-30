import { Module } from '@nestjs/common';
import { IsUniqueNicknameConstraint } from './is-unique-nickname.validator';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [UsuarioService, IsUniqueNicknameConstraint],
})
export class UsuarioModule {}
