import { FaRegStar, FaStar } from 'react-icons/fa6';

type Props = {
   value: number;
};

const StarRating = ({ value }: Props) => {
   const rating = Math.min(5, Math.max(0, value));

   return (
      <div
         className="flex gap-1 text-amber-500"
         role="img"
         aria-label={`Rating: ${rating} out of 5`}
      >
         {Array.from({ length: 5 }, (_, index) => {
            const fillPercentage = Math.min(
               100,
               Math.max(0, (rating - index) * 100)
            );

            return (
               <span key={index} className="relative inline-block shrink-0">
                  <FaRegStar />

                  <span
                     className="absolute inset-y-0 left-0 overflow-hidden"
                     style={{ width: `${fillPercentage}%` }}
                  >
                     <FaStar className="max-w-none" />
                  </span>
               </span>
            );
         })}
      </div>
   );
};

export default StarRating;
