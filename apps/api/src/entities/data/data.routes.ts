import { Router } from 'express';
import { verifyToken } from '../../tools/auth.tools';
import DataController from './data.controller';

const router = Router();

router.get('/homePage', verifyToken, DataController.getHomePage);
// router.get('/likes', DataController.getLikedPlaylists);
router.get('/stats', DataController.getStats);

router.get('/user', verifyToken, DataController.getUserInfos);
router.get('/posts', verifyToken, DataController.getUserPosts);

export default router;
