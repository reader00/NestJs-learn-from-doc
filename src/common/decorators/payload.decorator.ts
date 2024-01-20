import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Payload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        console.log(request.body);
        return "Payload decorator"
    }
)