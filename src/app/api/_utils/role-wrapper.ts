import { User, UserRole } from '@/app/generated/prisma';
import { authenticate } from '@/lib/utils';
import type { NextRequest } from 'next/server';

export interface RequestWithUser extends NextRequest {
  user: User;
}

export type RouteHandler = (
  req: RequestWithUser,
  context: any,
) => Promise<Response> | Response;

export function roleRoute(role: UserRole, handler: RouteHandler) {
  return async (req: NextRequest, context: any) => {
    const authResult = await authenticate(req, role);

    // Authentication failed → return Response immediately
    if (authResult instanceof Response) {
      return authResult;
    }

    // Attach user safely
    const reqWithUser = req as RequestWithUser;
    reqWithUser.user = authResult;

    // Pass both req and context to the handler
    return handler(reqWithUser, context);
  };
}
