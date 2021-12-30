import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { NestResponse } from "../core/http/nest-response";
import { NestResponseBuilder } from "../core/http/nest-response-builder";
import { Usuario } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Controller('users')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Get(':nickname')
    public buscaPorNickname(@Param('nickname') nickname: string) {
        const usuario = this.usuarioService.buscaPorNickname(nickname);

        if(!usuario) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado'
            });
        }
        return usuario;
    }

    @Post()
    public cria(@Body() usuario: Usuario): NestResponse {
        const usuarioCriado = this.usuarioService.cria(usuario);
        return new NestResponseBuilder()
            .status(HttpStatus.CREATED)
            .headers({'Location': `/users/${usuarioCriado.nickname}`})
            .body(usuarioCriado)
            .build();
    }
}