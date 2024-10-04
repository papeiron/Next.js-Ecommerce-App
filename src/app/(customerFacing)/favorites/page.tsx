import { ProductCard } from '@/components/shared/ui';
import { currentUser } from '@/lib/helpers';
import { fetchFavoritesByUser } from '@/lib/services/favorites';

async function FavoritesPage() {
  const user = await currentUser();

  if (!user || !user?.id) {
    return <p>Sign in to add to favorites</p>;
  }

  const favorites = await fetchFavoritesByUser(user?.id);

  return (
    <div className="h-full">
      <section className="grid h-full w-full auto-rows-[550px] grid-cols-4 gap-2">
        {favorites?.map((f) => (
          <ProductCard key={f.id} product={f.product} imgClass="h-[250px]" />
        ))}
      </section>
    </div>
  );
}

export default FavoritesPage;
