import { Router } from 'express';
import GoogleRouter from './google/google.routes';
import TwitterRouter from './twitter/twitter.routes';
import InstagramRouter from './instagram/instagram.routes';

const router = Router();

router.use('/google', GoogleRouter);
router.use('/twitter', TwitterRouter);
router.use('/instagram', InstagramRouter);

export default router;
