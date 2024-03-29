import { CallHandler, ExecutionContext, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Observable, TimeoutError, catchError, throwError, timeout } from "rxjs";

export class TimeoutInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        return next.
            handle().
            pipe(
                timeout(5000),
                catchError(err => {
                    if (err instanceof TimeoutError) {
                        return throwError(() => new RequestTimeoutException())
                    }

                    return throwError(() => err)
                })
            )
    }

}