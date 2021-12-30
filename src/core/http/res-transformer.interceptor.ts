import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NestResponse } from "./nest-response";

@Injectable()
export class ResTransformerInterceptor implements NestInterceptor {
    
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map((controllerRes: NestResponse) => {
                    if(controllerRes instanceof NestResponse) {
                        const ctx = context.switchToHttp();
                        const res = ctx.getResponse();
                        const { headers, status, body } = controllerRes;
                    
                        const headersNames = Object.getOwnPropertyNames(headers);

                        headersNames.forEach( headerName => {
                            const headerValue = headers[headerName];
                            this.httpAdapter.setHeader(res, headerName, headerValue);
                        });

                        this.httpAdapter.status(res, status);

                        return body;
                    }

                    return controllerRes;
                })
            );
    }
}