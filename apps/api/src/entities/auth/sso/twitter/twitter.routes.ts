import { Router } from 'express';
import TwitterController from './twitter.controller';
import { verifyToken } from '../../../../tools/auth.tools';

const TwitterRouter = Router();

TwitterRouter.get('/login', TwitterController.getCode);

TwitterRouter.get('/callback', verifyToken, TwitterController.getToken);

export default TwitterRouter;
