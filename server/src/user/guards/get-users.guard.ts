import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
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
    const { refreshToken } = request.cookies;
    const usrData = this.tokenService.validateRefreshToken(refreshToken);
    return !!usrData;
  }
}
