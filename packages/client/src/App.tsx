import './App.css';
import ChatBot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';

function App() {
   return (
      <div className="p-4 h-screen">
         <ReviewList productId={4} />
         <ChatBot />
      </div>
   );
}

export default App;
