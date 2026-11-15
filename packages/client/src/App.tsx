import { Activity, useCallback, useState } from 'react';

import './App.css';

import AppHeader, { type ActiveTab } from './components/layout/AppHeader';

import ChatBot from './components/chat/ChatBot';
import ReviewsPage from './components/reviews/ReviewsPage';

import { useViewTransition } from './hooks/useViewTransition';

function App() {
   const [activeTab, setActiveTab] = useState<ActiveTab>('chatbot');

   const startTransition = useViewTransition();

   const handleTabChange = useCallback(
      (nextTab: ActiveTab) => {
         if (nextTab === activeTab) return;

         const direction = nextTab === 'reviews' ? 'forward' : 'backward';

         startTransition(() => {
            setActiveTab(nextTab);
         }, direction);
      },
      [activeTab, startTransition]
   );

   return (
      <div className="flex h-dvh flex-col overflow-hidden bg-slate-50 font-sans text-slate-900">
         <AppHeader activeTab={activeTab} onTabChange={handleTabChange} />

         <main className="view-transition-content mx-auto flex min-h-0 w-full flex-1 flex-col px-3 sm:px-6">
            <Activity mode={activeTab === 'chatbot' ? 'visible' : 'hidden'}>
               <ChatBot />
            </Activity>

            <Activity mode={activeTab === 'reviews' ? 'visible' : 'hidden'}>
               <ReviewsPage />
            </Activity>
         </main>
      </div>
   );
}

export default App;
