import { Router } from 'express';
import GoogleRouter from './google/google.routes';
import TwitterRouter from './twitter/twitter.routes';

const router = Router();

router.use('/google', GoogleRouter);
router.use('/twitter', TwitterRouter);

export default router;
