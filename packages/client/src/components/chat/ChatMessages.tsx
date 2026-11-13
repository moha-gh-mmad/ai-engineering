import { useEffect, useRef } from 'react';
import type { ClipboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
   content: string;
   role: 'user' | 'bot';
};

type Props = {
   messages: Message[];
};

const onCopyMessage = (e: ClipboardEvent<HTMLDivElement>): void => {
   const selection = window.getSelection()?.toString().trim();

   if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
   }
};

const ChatMessages = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   return (
      <div className="flex flex-col gap-4">
         {messages.map((message, index) => {
            const isUser = message.role === 'user';

            return (
               <div
                  key={index}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  onCopy={onCopyMessage}
                  className={`
                     w-fit max-w-[85%] min-w-0 wrap-break-word
                     rounded-2xl px-4 py-2.5
                     text-sm leading-6
                     shadow-sm transition-shadow duration-200
                     hover:shadow-md
                     [&_p:first-child]:mt-0
                     [&_p:last-child]:mb-0
                     [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5
                     [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5
                     [&_li]:my-1
                     [&_a]:underline [&_a]:underline-offset-2
                     [&_code]:rounded [&_code]:bg-black/10
                     [&_code]:px-1 [&_code]:py-0.5
                     [&_pre]:my-2 [&_pre]:overflow-x-auto
                     [&_pre]:rounded-lg [&_pre]:bg-gray-900
                     [&_pre]:p-3 [&_pre]:text-gray-100
                     [&_pre_code]:bg-transparent
                     [&_pre_code]:p-0
                     ${
                        isUser
                           ? `
                              self-end rounded-br-md
                              bg-linear-to-br from-blue-500 to-indigo-700
                              text-white
                              shadow-blue-900/10
                              ring-1 ring-inset ring-white/15
                           `
                           : `
                              self-start rounded-bl-md
                              border border-gray-200/80
                              bg-linear-to-br from-white to-gray-100
                              text-gray-800
                              shadow-gray-900/5
                              ring-1 ring-inset ring-black/2
                           `
                     }
                  `}
               >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
               </div>
            );
         })}
      </div>
   );
};

export default ChatMessages;
