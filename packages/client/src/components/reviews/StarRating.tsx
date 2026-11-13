import { HiStar } from 'react-icons/hi2';

type Props = {
   value: number;
};

const StarRating = ({ value }: Props) => {
   const rating = Math.min(5, Math.max(0, value));

   return (
      <div
         role="img"
         aria-label={`Rating: ${rating.toFixed(1)} out of 5`}
         className="inline-flex items-center gap-2"
      >
         <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, index) => {
               const fillPercentage = Math.min(
                  100,
                  Math.max(0, (rating - index) * 100)
               );

               return (
                  <span
                     key={index}
                     aria-hidden="true"
                     className="relative block size-4 shrink-0"
                  >
                     <HiStar className="absolute inset-0 size-4 text-slate-200" />

                     <span
                        className="absolute inset-y-0 left-0 overflow-hidden"
                        style={{
                           width: `${fillPercentage}%`,
                        }}
                     >
                        <HiStar className="size-4 max-w-none text-amber-400" />
                     </span>
                  </span>
               );
            })}
         </div>

         <span className="text-xs font-semibold tabular-nums text-slate-600">
            {rating.toFixed(1)}
         </span>
      </div>
   );
};

export default StarRating;
