import { Router } from 'express';
import { verifyToken } from '../../tools/auth.tools';
import DataController from './data.controller';

const router = Router();

router.get('/homePage', verifyToken, DataController.getHomePage);
// router.get('/likes', DataController.getLikedPlaylists);
router.get('/stats', DataController.getStats);

router.get('/twitter/liked', verifyToken, DataController.getLikedTweets);
router.get('/twitter/profile', verifyToken, DataController.getTwitterProfile);
router.get('/twitter/search', verifyToken, DataController.searchTweets);
router.get('/twitter/bookmarks', verifyToken, DataController.myBookMarks);


export default router;
