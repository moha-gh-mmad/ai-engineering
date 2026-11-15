import ChatMessages from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import TypingIndicator from './TypingIndicator';
import useChatConversation from './useChatConversation';
import useChatSounds from './useChatSounds';

const ChatBot = () => {
   const { messages, isBotTyping, error, sendMessage } = useChatConversation();

   const { playSendSound, playResponseSound } = useChatSounds();

   const handleSubmit = async (data: ChatFormData) => {
      playSendSound();

      const succeeded = await sendMessage(data);

      if (succeeded) {
         playResponseSound();
      }
   };

   return (
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
         <div className="flex flex-1 flex-col gap-3 overflow-y-auto scrollbar-hide py-4 sm:py-5">
            <ChatMessages messages={messages} />

            {isBotTyping && <TypingIndicator />}

            {error && (
               <p role="alert" className="text-sm text-red-600">
                  {error}
               </p>
            )}
         </div>

         <ChatInput onSubmit={handleSubmit} />
      </div>
   );
};

export default ChatBot;
