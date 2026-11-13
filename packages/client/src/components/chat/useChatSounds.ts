import { useCallback, useRef } from 'react';

import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';

const useChatSounds = () => {
   const popAudioRef = useRef<HTMLAudioElement | null>(null);
   const notificationAudioRef = useRef<HTMLAudioElement | null>(null);

   const playSendSound = useCallback(() => {
      const audio = popAudioRef.current ?? new Audio(popSound);

      popAudioRef.current = audio;

      audio.currentTime = 0;
      void audio.play().catch(() => {});
   }, []);

   const playResponseSound = useCallback(() => {
      const audio =
         notificationAudioRef.current ?? new Audio(notificationSound);

      notificationAudioRef.current = audio;

      audio.currentTime = 0;
      void audio.play().catch(() => {});
   }, []);

   return {
      playSendSound,
      playResponseSound,
   };
};

export default useChatSounds;
