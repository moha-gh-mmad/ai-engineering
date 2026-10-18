import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import StarRating from './StarRating';

type Props = {
   productId: number;
};

type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

type GetReviewsResponse = {
   summary: string | null;
   reviews: Review[];
};

const ReviewList = ({ productId }: Props) => {
   const [reviewsData, setReviewData] = useState<GetReviewsResponse>();
   const [isLoaidng, setLoading] = useState(false);

   const fetchReviews = async () => {
      setLoading(true);
      const { data } = await axios.get<GetReviewsResponse>(
         `/api/products/${productId}/reviews`
      );
      setReviewData(data);
      setLoading(false);
   };

   useEffect(() => {
      fetchReviews();
   }, []);

   if (isLoaidng) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <div key={i}>
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                  <Skeleton count={2} />
               </div>
            ))}
         </div>
      );
   }
   return (
      <div>
         {reviewsData?.reviews.map((review) => (
            <div className="flex flex-col gap-5" key={review.id}>
               <div className="font-semibold">{review.author}</div>
               <div className="">
                  <StarRating value={review.rating} />
               </div>
               <p className="py-2">{review.content}</p>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;
