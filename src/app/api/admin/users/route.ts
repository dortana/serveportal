import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { RequestWithUser, roleRoute } from '@/app/api/_utils/role-wrapper';
import { UserRole } from '@/app/generated/prisma';

export const GET = roleRoute(
  UserRole.ADMIN,
  async (request: RequestWithUser) => {
    try {
      const { searchParams } = request.nextUrl;
      const page = parseInt(searchParams.get('page') || '1', 10);
      const search = searchParams.get('search') || '';
      const limit = parseInt(searchParams.get('limit') || '10', 10);
      const sort = searchParams.get('sort') || 'createdAt';
      const order = searchParams.get('order') || 'desc';

      const status = searchParams.get('status')?.split(',') || [];
      const role = searchParams.get('role')?.split(',') || [];

      if (page < 1 || limit < 1) {
        return NextResponse.json(
          { error: 'Invalid page or limit' },
          { status: 400 },
        );
      }

      const skip = (page - 1) * limit;

      const validSortFields = [
        'createdAt',
        'updatedAt',
        'history_id',
        'status',
        'action',
        'action_sub',
      ];

      const sortField = validSortFields.includes(sort) ? sort : 'createdAt';
      const sortOrder = order === 'asc' ? 'asc' : 'desc';

      const whereClause: any = {};

      // Add search filter
      if (search) {
        const trimmed = search.trim();
        const parts = trimmed.split(/\s+/);
        // const num = Number(search);
        whereClause.OR = [
          // always match description (case‐insensitive substring)
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { vatNumber: { contains: search, mode: 'insensitive' } },

          // Full name search (firstName + lastName in any order)
          {
            AND: parts.map(part => ({
              OR: [
                { firstName: { contains: part, mode: 'insensitive' } },
                { lastName: { contains: part, mode: 'insensitive' } },
              ],
            })),
          },

          // only add the numeric match if `search` parsed to a real number
          // ...(Number.isFinite(num) ? [{ amount: num }] : []),
        ];
      }

      if (status.length > 0) {
        whereClause.status = {
          in: status,
        };
      }

      if (role.length > 0) {
        whereClause.role = {
          in: role,
        };
      }

      const users = await prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          [sortField]: sortOrder,
        },
      });

      const totalHistory = await prisma.user.count({
        where: whereClause,
      });

      const totalPages = Math.ceil(totalHistory / limit);

      return NextResponse.json(
        {
          data: {
            users,
            pagination: {
              page,
              limit,
              totalCount: totalHistory,
              totalPages,
            },
          },
        },
        { status: 200 },
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Something went wrong' },
        {
          status: 500,
        },
      );
    }
  },
);
