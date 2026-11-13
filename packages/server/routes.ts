import { Router } from 'express';
import { reviewController } from './controllers/review.controller';
import { chatController } from './controllers/chat.controller';

const router = Router();

router.get('/', (_req, res) => {
   res.status(200).send('API is running.');
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', reviewController.getReviews);

router.post(
   '/api/products/:id/reviews/summarize',
   reviewController.summariesReviews
);

export default router;
