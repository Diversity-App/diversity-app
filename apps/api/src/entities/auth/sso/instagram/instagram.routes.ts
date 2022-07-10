import { Router } from 'express';
import InstagramController from './instagram.controller';
import { verifyToken } from '../../../../tools/auth.tools';

const router = Router();

router.get('/login', InstagramController.getCode);

router.get('/callback', verifyToken, InstagramController.getToken);

export default router;
