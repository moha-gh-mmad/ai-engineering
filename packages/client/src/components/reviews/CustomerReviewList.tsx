import ReviewCard from './ReviewCard';
import type { Review } from './reviewsApi';

type Props = {
   reviews: Review[];
};

const CustomerReviewList = ({ reviews }: Props) => {
   return (
      <section>
         <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-slate-800">
               Customer reviews
            </h3>

            <span className="text-xs font-medium text-slate-500">
               {reviews.length} reviews
            </span>
         </div>

         <div className="flex flex-col gap-3">
            {reviews.map((review) => (
               <ReviewCard key={review.id} review={review} />
            ))}
         </div>
      </section>
   );
};

export default CustomerReviewList;
