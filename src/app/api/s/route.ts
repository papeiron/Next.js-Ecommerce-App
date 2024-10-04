import { searchProductsCategoriesStores } from '@/lib/services/search';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  try {
    const results = await searchProductsCategoriesStores(query as string);
    return Response.json({ results });
  } catch (error) {
    console.error('Error fetching results:', error);
    return Response.json({ message: 'Results not found' }, { status: 404 });
  }
}
