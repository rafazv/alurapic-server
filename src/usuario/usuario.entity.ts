import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsUniqueNickname } from "./is-unique-nickname.validator";

export class Usuario {
    id: number;

    @IsNotEmpty({
        message: 'Nome é obrigatório'
    })
    nome: string;

    @IsEmail({}, {
        message: 'Email precisa ser válido'
    })
    email: string;

    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty({
        message: 'Senha é obrigatória'
    })
    senha: string;

    @IsUniqueNickname({
        message: 'Nickname precisa ser único'
    })
    @IsNotEmpty({
        message: 'Nickname é obrigatório'
    })
    @IsString()
    nickname: string;
    data: Date;
}