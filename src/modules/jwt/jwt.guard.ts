import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContextHost,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside Jwt AuthGuard Can Activate');
    return super.canActivate(context);
  }
}
