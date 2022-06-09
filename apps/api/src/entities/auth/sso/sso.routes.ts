import { Router } from 'express';
import GoogleRouter from './google/google.routes';
import InstagramRouter from './instagram/instagram.routes';

const router = Router();

router.use('/google', GoogleRouter);
router.use('/instagram', InstagramRouter);

export default router;
