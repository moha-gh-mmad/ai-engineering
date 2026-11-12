import { useState } from 'react';
import './App.css';
import ChatBot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';

type ActiveTab = 'chatbot' | 'reviews';

function App() {
   const [activeTab, setActiveTab] = useState<ActiveTab>('chatbot');

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
                     onClick={() => setActiveTab('chatbot')}
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
                     onClick={() => setActiveTab('reviews')}
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

         <main className="mx-auto flex w-full min-h-0 flex-1 flex-col px-3 py-3 sm:px-6 sm:py-4">
            {activeTab === 'chatbot' ? (
               <ChatBot />
            ) : (
               <div className="h-full min-h-0 overflow-y-auto scrollbar-hide">
                  <ReviewList productId={2} />
               </div>
            )}
         </main>
      </div>
   );
}

export default App;
