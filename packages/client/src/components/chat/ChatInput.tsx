import { FaArrowUp } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';

export type ChatFormData = { prompt: string };

type Props = {
   onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>({
      mode: 'onChange',
   });

   const submit = handleSubmit((data) => {
      reset({ prompt: '' });
      onSubmit(data);
   });

   const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };

   return (
      <div className="relative w-full rounded-3xl">
         <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 -z-10 rounded-[calc(1.5rem+4px)] bg-[conic-gradient(from_var(--angle),#ff4545,#00ff99,#006aff,#ff0095,#ff4545)] animate-[border-spin_5s_linear_infinite] blur-md opacity-50"
         />

         <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl bg-[conic-gradient(from_var(--angle),#ff4545,#00ff99,#006aff,#ff0095,#ff4545)] animate-[border-spin_5s_linear_infinite]"
         />

         <form
            onSubmit={submit}
            onKeyDown={handleKeyDown}
            className="relative z-10 m-[1.5px] flex flex-col items-end gap-2 rounded-[calc(1.5rem-2px)] bg-white p-4"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (data) => data.trim().length > 0,
               })}
               autoFocus
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask anything"
               maxLength={1000}
            />

            <Button
               disabled={!formState.isValid}
               type="submit"
               className="rounded-full w-9 h-9 items-center justify-center"
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatInput;
