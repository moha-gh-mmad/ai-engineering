import { useMutation, useQuery } from '@tanstack/react-query';
import ReviewSkeleton from './ReviewSkeleton';
import ReviewSummaryPanel from './ReviewSummaryPanel';
import CustomerReviewList from './CustomerReviewList';
import {
   reviewsApi,
   type GetReviewsResponse,
   type SummarizeResponse,
} from './reviewsApi';

type Props = {
   productId: number;
};

const ReviewList = ({ productId }: Props) => {
   const reviewsQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsApi.fetchReviews(productId),
   });

   const summaryMutation = useMutation<SummarizeResponse>({
      mutationFn: () => reviewsApi.summarizeReviews(productId),
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
         <p role="alert" className="text-sm text-red-600">
            Could not fetch reviews. Please try again.
         </p>
      );
   }

   const reviews = reviewsQuery.data?.reviews ?? [];

   const currentSummary =
      reviewsQuery.data?.summary || summaryMutation.data?.summary;

   if (reviews.length === 0 && !currentSummary) {
      return (
         <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center">
            <p className="font-medium text-slate-700">No reviews available</p>

            <p className="mt-1 text-sm text-slate-500">
               There are currently no customer reviews for this product.
            </p>
         </div>
      );
   }

   return (
      <div className="space-y-7">
         {reviews.length > 0 && (
            <ReviewSummaryPanel
               summary={currentSummary}
               isPending={summaryMutation.isPending}
               isError={summaryMutation.isError}
               onGenerate={() => summaryMutation.mutate()}
            />
         )}

         {reviews.length > 0 ? (
            <CustomerReviewList reviews={reviews} />
         ) : (
            <p className="text-sm text-slate-500">
               No customer reviews available.
            </p>
         )}
      </div>
   );
};

export default ReviewList;
