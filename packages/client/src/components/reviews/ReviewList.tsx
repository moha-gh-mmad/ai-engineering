import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HiSparkles, HiExclamationCircle } from 'react-icons/hi2';
import ReviewSkeleton from './ReviewSkeleton';
import {
   reviewsApi,
   type GetReviewsResponse,
   type SummarizeResponse,
} from './reviewsApi';

type Props = {
   productId: number;
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

const ReviewList = ({ productId }: Props) => {
   const summaryMutation = useMutation<SummarizeResponse>({
      mutationFn: () => reviewsApi.summarizeReviews(productId),
   });

   const reviewsQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsApi.fetchReviews(productId),
   });

   if (reviewsQuery.isLoading) {
      return (
         <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
               <ReviewSkeleton key={i} />
            ))}
         </div>
      );
   }

   if (reviewsQuery.isError) {
      return (
         <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            <HiExclamationCircle className="size-5 shrink-0" />
            <p>Could not fetch reviews. Please try again.</p>
         </div>
      );
   }

   const data = reviewsQuery.data;

   if (!data) return null;

   const reviews = data.reviews ?? [];

   if (reviews.length === 0) {
      return (
         <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center">
            <p className="font-medium text-slate-700">No reviews available</p>
            <p className="mt-1 text-sm text-slate-500">
               There are currently no customer reviews for this product.
            </p>
         </div>
      );
   }

   const currentSummary = data.summary || summaryMutation.data?.summary;

   return (
      <div className="space-y-7">
         {currentSummary ? (
            <section className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 sm:p-5">
               <div className="flex items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                     <HiSparkles className="size-5" />
                  </div>

                  <div>
                     <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                        AI-generated summary
                     </p>
                     <h3 className="text-base font-bold text-slate-800">
                        Key takeaways
                     </h3>
                  </div>
               </div>

               <p className="mt-4 font-serif text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                  {currentSummary}
               </p>
            </section>
         ) : (
            <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
               <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-3">
                     <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <HiSparkles className="size-5" />
                     </div>

                     <div>
                        <h3 className="font-semibold text-slate-800">
                           AI review summary
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                           Get the key insights from customer feedback.
                        </p>
                     </div>
                  </div>

                  <button
                     type="button"
                     onClick={() => summaryMutation.mutate()}
                     disabled={summaryMutation.isPending}
                     className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                     <HiSparkles className="size-4" />
                     {summaryMutation.isPending
                        ? 'Summarizing...'
                        : 'Summarize reviews'}
                  </button>
               </div>

               {summaryMutation.isPending && (
                  <div className="mt-5 border-t border-slate-100 pt-4">
                     <ReviewSkeleton />
                  </div>
               )}

               {summaryMutation.isError && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-red-600">
                     <HiExclamationCircle className="size-4 shrink-0" />
                     <p>Could not summarize reviews. Please try again.</p>
                  </div>
               )}
            </section>
         )}

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
                  <article
                     key={review.id}
                     className="rounded-xl border border-slate-200 bg-white p-4 transition-shadow duration-200 hover:shadow-sm sm:p-5"
                  >
                     <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                           <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                              {getInitials(review.author)}
                           </div>

                           <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-slate-800">
                                 {review.author}
                              </p>
                              <p className="text-xs text-slate-500">
                                 Customer review
                              </p>
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
               ))}
            </div>
         </section>
      </div>
   );
};

export default ReviewList;
