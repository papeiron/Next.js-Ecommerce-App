import { Rating } from '@/components/shared/ui';
import { calculateTotalProductRating, formatDateTertiary } from '@/lib/utils';
import { ReviewWith } from '@/types';

type ProductReviewsProps = {
  reviews: ReviewWith<'user'>[] | undefined;
};

function ProductReviews({ reviews }: ProductReviewsProps) {
  const ratings: { [key: string]: number } = {
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0,
  };

  let totalRating;
  if (!reviews || reviews.length === 0) {
    return (
      <div className="px-6 py-10">
        <p>Not commented yet</p>
      </div>
    );
  }

  reviews.forEach((r) => {
    ratings[Math.floor(r.rating)] = (ratings[r.rating] ?? 0) + 1;
  });

  const reviewsSorted = Object.entries(ratings).sort(
    (a, b) => Number(b[0]) - Number(a[0]),
  );

  totalRating = calculateTotalProductRating(reviews);

  const getProgressWidth = (w: number) => {
    const totalWidth = (w * 100) / reviews.length;

    return { width: `${totalWidth}%` };
  };

  return (
    <section className="flex flex-col gap-20 px-6 py-10">
      <div className="flex flex-col gap-3">
        <p className="font-medium">Based on {reviews.length} reviews</p>
        <div className="flex gap-4">
          <div className="flex h-32 w-32 items-center justify-center rounded-md border">
            <div>
              <p className="text-center text-xl font-bold">{totalRating.toFixed(1)}</p>
              <p className="soft-text">Average score</p>
            </div>
          </div>
          <div className="flex items-center">
            <Rating
              size={5}
              editable={false}
              value={totalRating}
              starHw={{ h: 'h-6', w: 'w-6' }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {reviewsSorted.map((r, index) => (
            <div key={index} className="flex gap-6">
              <div>
                <Rating
                  size={5}
                  editable={false}
                  value={Number(r[0])}
                  starHw={{ h: 'h-5', w: 'w-5' }}
                />
              </div>
              <div className="flex items-center gap-4">
                <p className="soft-text text-xs">{r[1]}</p>
                <div className="h-1 w-48 rounded-xl bg-gray-300">
                  <div
                    className={`h-1 rounded-xl bg-orange-300`}
                    style={getProgressWidth(r[1])}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {reviews?.map((r) => (
          <div key={r.id} className="flex flex-col gap-4 py-6">
            <div className="flex justify-between">
              <p className="soft-text flex gap-1">
                <span className="font-bold text-gray-custom-1">{r.user?.name}</span>
                <span>&#8226;</span>
                {formatDateTertiary(r.created_at)}
              </p>
              <Rating
                size={5}
                editable={false}
                value={r.rating}
                starHw={{ h: 'h-4', w: 'w-4' }}
              />
            </div>
            <div>
              <p>{r.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductReviews;
