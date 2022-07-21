import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class GetUsersGuard implements CanActivate {
  constructor(@Inject(TokenService) private tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headerToken = request.headers.authorization;
    const accessToken = headerToken?.split(' ')[1];
    const usrData = this.tokenService.validateAccessToken(accessToken);
    if (!usrData) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
