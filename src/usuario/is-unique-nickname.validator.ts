import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioService } from "./usuario.service";

@Injectable()
@ValidatorConstraint()
export class IsUniqueNicknameConstraint implements ValidatorConstraintInterface {
    constructor(private usuarioService: UsuarioService) {}

    validate(nickname: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return !!!this.usuarioService.buscaPorNickname(nickname);
    }
}

export function IsUniqueNickname(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUniqueNicknameConstraint,
        })
    }
}

