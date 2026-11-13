import StarRating from './StarRating';
import type { Review } from './reviewsApi';

type Props = {
   review: Review;
};

const getInitials = (name: string): string => {
   const parts = name.trim().split(/\s+/).filter(Boolean);

   return (
      parts
         .slice(0, 2)
         .map((part) => part[0])
         .join('')
         .toUpperCase() || 'U'
   );
};

const ReviewCard = ({ review }: Props) => {
   return (
      <article className="rounded-xl border border-slate-200 bg-white p-4 transition-shadow duration-200 hover:shadow-sm sm:p-5">
         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
               <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  {getInitials(review.author)}
               </div>

               <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                     {review.author}
                  </p>

                  <p className="text-xs text-slate-500">Customer review</p>
               </div>
            </div>

            <div className="shrink-0">
               <StarRating value={review.rating} />
            </div>
         </div>

         <p className="mt-3 text-sm leading-6 text-slate-600">
            {review.content}
         </p>
      </article>
   );
};

export default ReviewCard;
