import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

/*
  Ensures the user is authorized, and if so, adds users info to the request object
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const token: string = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return false;
    }
    try {
      const obj: { id: number } = this.jwt.verify(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: obj.id,
        },
      });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return false;
    }
  }
}