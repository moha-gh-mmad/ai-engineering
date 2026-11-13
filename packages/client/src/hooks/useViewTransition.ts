import { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';

type Direction = 'forward' | 'backward';

type ViewTransitionDocument = Document & {
   startViewTransition?: (updateCallback: () => void) => {
      finished: Promise<void>;
   };
};

export const useViewTransition = () => {
   const transitionIdRef = useRef(0);

   const startTransition = useCallback(
      (update: () => void, direction: Direction) => {
         const root = document.documentElement;
         const transitionId = ++transitionIdRef.current;

         root.dataset.transitionDirection = direction;

         const cleanup = () => {
            if (transitionIdRef.current === transitionId) {
               delete root.dataset.transitionDirection;
            }
         };

         const transitionDocument = document as ViewTransitionDocument;

         if (!transitionDocument.startViewTransition) {
            update();
            cleanup();
            return;
         }

         try {
            const transition = transitionDocument.startViewTransition(() => {
               flushSync(update);
            });

            void transition.finished.then(cleanup, cleanup);
         } catch {
            cleanup();
            update();
         }
      },
      []
   );

   return startTransition;
};
