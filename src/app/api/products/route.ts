import { auth } from '@/lib/auth';
import { fetchProductsByStore } from '@/lib/services/product';

export async function GET() {
  const session = await auth();

  if (!session || !session.user || !session.user.id || !session.user.store) {
    return Response.json(
      { message: 'You dont have permission to do that.' },
      { status: 401 },
    );
  }

  try {
    const products = await fetchProductsByStore({ storeId: session.user.store.id });
    if (!products) {
      Response.json({ message: 'Products not found' }, { status: 404 });
    }
    return Response.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ message: 'Products not found' }, { status: 404 });
  }
}
