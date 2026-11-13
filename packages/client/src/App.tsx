import { Activity, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { IconType } from 'react-icons';
import {
   HiSparkles,
   HiChatBubbleLeftRight,
   HiStar,
   HiOutlineDeviceTablet,
} from 'react-icons/hi2';
import { BsEarbuds, BsMouse, BsHeadphones } from 'react-icons/bs';
import { RiChargingPile2Line } from 'react-icons/ri';

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

const productIcons: Record<ProductId, IconType> = {
   1: BsEarbuds,
   2: BsHeadphones,
   3: BsMouse,
   4: HiOutlineDeviceTablet,
   5: RiChargingPile2Line,
};

function App() {
   const [activeTab, setActiveTab] = useState<ActiveTab>('chatbot');
   const [activeProductId, setActiveProductId] = useState<ProductId>(1);

   const transitionIdRef = useRef(0);

   const handleTabChange = (nextTab: ActiveTab) => {
      if (nextTab === activeTab) return;

      const root = document.documentElement;
      const transitionId = ++transitionIdRef.current;

      root.dataset.transitionDirection =
         nextTab === 'reviews' ? 'forward' : 'backward';

      const clearTransitionDirection = () => {
         if (transitionIdRef.current === transitionId) {
            delete root.dataset.transitionDirection;
         }
      };

      const transitionDocument = document as ViewTransitionDocument;

      if (!transitionDocument.startViewTransition) {
         clearTransitionDirection();
         setActiveTab(nextTab);
         return;
      }

      try {
         const transition = transitionDocument.startViewTransition(() => {
            flushSync(() => {
               setActiveTab(nextTab);
            });
         });

         void transition.finished.then(
            clearTransitionDirection,
            clearTransitionDirection
         );
      } catch {
         clearTransitionDirection();
         setActiveTab(nextTab);
      }
   };

   return (
      <div className="flex h-dvh flex-col overflow-hidden bg-slate-50 font-sans text-slate-900">
         {/* Header */}
         <header className="shrink-0 border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
               {/* Logo */}
               <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                     <HiSparkles className="size-5" />
                  </div>

                  <div>
                     <h1 className="text-base font-bold tracking-tight sm:text-lg">
                        AI Toolkit
                     </h1>
                     <p className="hidden text-xs text-slate-500 sm:block">
                        Your AI workspace
                     </p>
                  </div>
               </div>

               {/* Navigation */}
               <nav
                  aria-label="Main navigation"
                  className="flex shrink-0 items-center rounded-xl border border-slate-200 bg-slate-50 p-1"
               >
                  <button
                     type="button"
                     onClick={() => handleTabChange('chatbot')}
                     aria-current={activeTab === 'chatbot' ? 'page' : undefined}
                     className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors duration-200 sm:gap-2 sm:px-4 sm:text-sm ${
                        activeTab === 'chatbot'
                           ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                           : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                     }`}
                  >
                     <HiChatBubbleLeftRight className="size-4 shrink-0" />
                     AI Chatbot
                  </button>

                  <button
                     type="button"
                     onClick={() => handleTabChange('reviews')}
                     aria-current={activeTab === 'reviews' ? 'page' : undefined}
                     className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors duration-200 sm:gap-2 sm:px-4 sm:text-sm ${
                        activeTab === 'reviews'
                           ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                           : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                     }`}
                  >
                     <HiStar className="size-4 shrink-0" />
                     Reviews
                  </button>
               </nav>
            </div>
         </header>

         {/* Main content */}
         <main className="view-transition-content mx-auto flex min-h-0 w-full flex-1 flex-col px-3 py-4 sm:px-6 sm:py-5">
            {/* Chatbot */}
            <Activity mode={activeTab === 'chatbot' ? 'visible' : 'hidden'}>
               <ChatBot />
            </Activity>

            {/* Review Summarizer */}
            <Activity mode={activeTab === 'reviews' ? 'visible' : 'hidden'}>
               <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">
                  <div className="mx-auto w-full max-w-6xl py-2">
                     {/* Product selection */}
                     <div className="mb-6">
                        <div className="mb-3">
                           <h2 className="text-lg font-bold tracking-tight">
                              Select a product
                           </h2>

                           <p className="mt-1 text-sm text-slate-500">
                              Choose a product to explore its customer reviews.
                           </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                           {ProductIds.map((productId) => {
                              const isSelected = activeProductId === productId;

                              const ProductIcon = productIcons[productId];

                              return (
                                 <button
                                    key={productId}
                                    type="button"
                                    onClick={() =>
                                       setActiveProductId(productId)
                                    }
                                    aria-pressed={isSelected}
                                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                                       isSelected
                                          ? 'border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm'
                                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                 >
                                    {isSelected && (
                                       <ProductIcon
                                          className="size-4 shrink-0"
                                          aria-hidden="true"
                                       />
                                    )}

                                    <span>{productNames[productId]}</span>
                                 </button>
                              );
                           })}
                        </div>
                     </div>

                     {/* Reviews section */}
                     <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                        <h2 className="mb-5 text-xl font-bold tracking-tight">
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
