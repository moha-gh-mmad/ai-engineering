import { HiSparkles, HiChatBubbleLeftRight, HiStar } from 'react-icons/hi2';

export type ActiveTab = 'chatbot' | 'reviews';

type Props = {
   activeTab: ActiveTab;
   onTabChange: (tab: ActiveTab) => void;
};

const AppHeader = ({ activeTab, onTabChange }: Props) => {
   const navigationItems = [
      {
         id: 'chatbot',
         label: 'AI Chatbot',
         Icon: HiChatBubbleLeftRight,
      },
      {
         id: 'reviews',
         label: 'Reviews',
         Icon: HiStar,
      },
   ] as const;

   return (
      <header className="shrink-0 border-b border-slate-200 bg-white">
         <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
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

            <nav
               aria-label="Main navigation"
               className="flex shrink-0 items-center rounded-xl border border-slate-200 bg-slate-50 p-1"
            >
               {navigationItems.map(({ id, label, Icon }) => {
                  const isActive = activeTab === id;

                  return (
                     <button
                        key={id}
                        type="button"
                        onClick={() => onTabChange(id)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:gap-2 sm:px-4 sm:text-sm ${
                           isActive
                              ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                     >
                        <Icon className="size-4 shrink-0" />
                        {label}
                     </button>
                  );
               })}
            </nav>
         </div>
      </header>
   );
};

export default AppHeader;
