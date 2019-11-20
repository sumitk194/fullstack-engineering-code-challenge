import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import chalk from 'chalk';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { log } = console;
    const message = `${chalk.green(request.method)} ${chalk.yellow(request.originalUrl)}`;
    const separator = '======================================================================================';
    log(chalk.yellow(separator));
    log(chalk.magentaBright('Request Start:'), message);
    log(chalk.magentaBright('Request Body:'));
    log(chalk.cyanBright(JSON.stringify(request.body, null, 4)));

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap((data) => {
          log(chalk.magentaBright('Request End:'), `${message}`, chalk.greenBright(`${Date.now() - now}ms`));
          log(chalk.cyanBright(separator));
        }),
      );
  }
}
