
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable,
NestInterceptor,
ExecutionContext,
CallHandler, 
UseInterceptors} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
    new (...args: any[]): {};
}

export function Serialization(dto: ClassConstructor) {
    return UseInterceptors(new SerializationInterceptor(dto));
}

@Injectable()
export class SerializationInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                });
            })
        );
    }

}