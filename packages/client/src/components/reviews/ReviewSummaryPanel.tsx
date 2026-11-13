import { HiSparkles, HiExclamationCircle } from 'react-icons/hi2';

type Props = {
   summary?: string;
   isPending: boolean;
   isError: boolean;
   onGenerate: () => void;
};

const ReviewSummaryPanel = ({
   summary,
   isPending,
   isError,
   onGenerate,
}: Props) => {
   if (summary) {
      return (
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
               {summary}
            </p>
         </section>
      );
   }

   return (
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
               onClick={onGenerate}
               disabled={isPending}
               className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
               <HiSparkles className="size-4" />

               {isPending ? 'Summarizing...' : 'Summarize reviews'}
            </button>
         </div>

         {isPending && (
            <div
               className="mt-5 space-y-3 border-t border-slate-100 pt-4"
               aria-label="Generating summary"
               role="status"
            >
               <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
               <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
               <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
            </div>
         )}

         {isError && (
            <div
               role="alert"
               className="mt-4 flex items-center gap-2 text-sm text-red-600"
            >
               <HiExclamationCircle className="size-4 shrink-0" />

               <p>Could not summarize reviews. Please try again.</p>
            </div>
         )}
      </section>
   );
};

export default ReviewSummaryPanel;
