import { auth } from '@/lib/auth';
import { fetchCategoryBySlug } from '@/lib/services/category';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id || !session.user.store) {
    return Response.json(
      { message: 'You dont have permission to do that.' },
      { status: 401 },
    );
  }

  try {
    const category = await fetchCategoryBySlug(slug);
    if (category) {
      return Response.json({
        id: category.id,
        name: category.name,
        slug: category.slug,
        sub_categories: category.sub_categories.map((sub) => ({
          id: sub.id,
          name: sub.name,
          slug: sub.slug,
          productCount: sub._count.products,
        })),
      });
    } else {
      return Response.json({ error: 'Category not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    return Response.json({ error: 'Internal Server ErrorA' }, { status: 500 });
  }
}
