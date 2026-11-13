import { Activity, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './App.css';
import ChatBot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';

type ActiveTab = 'chatbot' | 'reviews';

type ViewTransitionDocument = Document & {
   startViewTransition?: (updateCallback: () => void) => {
      finished: Promise<void>;
   };
};

const ProductIds = [1, 2, 3, 4, 5] as const;

type ProductId = (typeof ProductIds)[number];

const productNames: Record<ProductId, string> = {
   1: 'AirPods Pro 2',
   2: 'Sony Headphones',
   3: 'Logitech Mouse',
   4: 'Galaxy Tab S9',
   5: 'Anker 737',
};

function App() {
   const [activeTab, setActiveTab] = useState<ActiveTab>('chatbot');
   const [activeProductId, setActiveProductId] = useState<ProductId>(1);

   // Prevent an older transition from clearing the direction
   // attribute of a newer transition.
   const transitionIdRef = useRef(0);

   const handleTabChange = (nextTab: ActiveTab) => {
      if (nextTab === activeTab) return;

      const root = document.documentElement;
      const transitionId = ++transitionIdRef.current;

      // Chatbot -> Reviews: slide left.
      // Reviews -> Chatbot: slide right.
      root.dataset.transitionDirection =
         nextTab === 'reviews' ? 'forward' : 'backward';

      const clearTransitionDirection = () => {
         if (transitionIdRef.current === transitionId) {
            delete root.dataset.transitionDirection;
         }
      };

      const transitionDocument = document as ViewTransitionDocument;

      // Fallback for browsers without View Transition API support.
      if (!transitionDocument.startViewTransition) {
         clearTransitionDirection();
         setActiveTab(nextTab);
         return;
      }

      try {
         const transition = transitionDocument.startViewTransition(() => {
            // Make React commit the DOM update inside the
            // View Transition callback.
            flushSync(() => {
               setActiveTab(nextTab);
            });
         });

         // Clean up after the animation finishes.
         void transition.finished.then(
            clearTransitionDirection,
            clearTransitionDirection
         );
      } catch {
         // Preserve navigation even if the transition fails.
         clearTransitionDirection();
         setActiveTab(nextTab);
      }
   };

   return (
      <div className="flex h-dvh flex-col overflow-hidden bg-gray-50 font-sans text-gray-900">
         <nav className="shrink-0 border-b border-gray-200 bg-white px-3 py-3 sm:px-6 sm:py-4">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2">
               <h1 className="whitespace-nowrap text-[clamp(0.75rem,2.5vw,1.25rem)] font-bold">
                  AI Toolkit
               </h1>

               <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  <button
                     type="button"
                     onClick={() => handleTabChange('chatbot')}
                     aria-current={activeTab === 'chatbot' ? 'page' : undefined}
                     className={`cursor-pointer whitespace-nowrap rounded-lg px-2 py-2 text-[clamp(0.6rem,1.8vw,0.875rem)] font-medium transition-all duration-200 ease-in-out hover:scale-105 sm:px-4 ${
                        activeTab === 'chatbot'
                           ? 'bg-indigo-600 text-white'
                           : 'text-gray-600 hover:bg-gray-100'
                     }`}
                  >
                     AI Chatbot
                  </button>

                  <button
                     type="button"
                     onClick={() => handleTabChange('reviews')}
                     aria-current={activeTab === 'reviews' ? 'page' : undefined}
                     className={`cursor-pointer whitespace-nowrap rounded-lg px-2 py-2 text-[clamp(0.6rem,1.8vw,0.875rem)] font-medium transition-all duration-200 ease-in-out hover:scale-105 sm:px-4 ${
                        activeTab === 'reviews'
                           ? 'bg-indigo-600 text-white'
                           : 'text-gray-600 hover:bg-gray-100'
                     }`}
                  >
                     Review Summarizer
                  </button>
               </div>
            </div>
         </nav>

         <main className="view-transition-content mx-auto flex min-h-0 w-full flex-1 flex-col px-3 py-3 sm:px-6 sm:py-4">
            <Activity mode={activeTab === 'chatbot' ? 'visible' : 'hidden'}>
               <ChatBot />
            </Activity>

            <Activity mode={activeTab === 'reviews' ? 'visible' : 'hidden'}>
               <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">
                  <div className="mx-auto w-full max-w-6xl py-2">
                     <div className="mb-6">
                        <h2 className="mb-3 text-lg font-bold">
                           Select a product
                        </h2>

                        <div className="flex flex-wrap gap-2">
                           {ProductIds.map((productId) => (
                              <button
                                 key={productId}
                                 type="button"
                                 onClick={() => setActiveProductId(productId)}
                                 aria-pressed={activeProductId === productId}
                                 className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    activeProductId === productId
                                       ? 'border-indigo-600 bg-indigo-600 text-white'
                                       : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-400 hover:bg-indigo-50'
                                 }`}
                              >
                                 {productNames[productId]}
                              </button>
                           ))}
                        </div>
                     </div>

                     <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                        <h2 className="mb-5 text-xl font-bold">
                           {productNames[activeProductId]} Reviews
                        </h2>

                        <ReviewList
                           key={activeProductId}
                           productId={activeProductId}
                        />
                     </section>
                  </div>
               </div>
            </Activity>
         </main>
      </div>
   );
}

export default App;
