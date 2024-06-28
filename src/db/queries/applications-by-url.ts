import { db } from '@/db';

interface SearchParams {
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  username?: string;
  sort?: string;
}

export async function fetchBySearchParams(searchParams: SearchParams): Promise<any[]> {
  const { dateFrom, dateTo, status, username, sort } = searchParams;
  const where: any = {};

  if (dateFrom) {
    where.application_date = where.application_date || {};
    where.application_date.gte = dateFrom;
  }

  if (dateTo) {
    where.application_date = where.application_date || {};
    where.application_date.lte = dateTo;
  }

  if (status) {
    where.status = status;
  }

  if (username) {
    where.user = { username };
  }

  const orderBy: any = {};
  if (sort) {
    const direction = sort.endsWith("Asc") ? "asc" : "desc";
    orderBy.application_date = direction;
  }

  return db.application.findMany({
    where,
    orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    include: { user: true }, // assuming the user relation is needed for the username filter
  });
}
