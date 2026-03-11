import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const inicio = Date.now();

    res.on('finish', () => {
      const fin = Date.now();
      const tiempo = fin - inicio;
      console.log(`[TIME] ${req.method} ${req.originalUrl} - ${tiempo}ms`);
    });

    next();
  }
}
