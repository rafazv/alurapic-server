import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity";

@Injectable()
export class UsuarioService {
    private usuarios: Array<Usuario> = [{
        id: 0,
        nome: 'Rafaela',
        email: 'rafaela@email.com',
        senha: '1234',
        nickname: 'rafaela',
        data: new Date()
    }];
    
    public buscaPorNickname(nickname: string): Usuario {
        return this.usuarios.find(usuario => usuario.nickname == nickname);
    }

    public cria(usuario: Usuario): Usuario {
        this.usuarios.push(usuario);

        return usuario;
    }
}