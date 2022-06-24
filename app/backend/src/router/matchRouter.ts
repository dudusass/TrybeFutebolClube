import { Request, Response, Router } from 'express';
import MatchController from '../controllers/matchController';
import auth from '../middleware/auth';
import { matchMiddleware, validateTeams } from '../middleware/matches';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await matchController.getMatches(req, res);
  },
);

matchRouter.post(
  '/',
  auth,
  matchMiddleware,
  validateTeams,
  async (req: Request, res: Response) => {
    await matchController.createdMatch(req, res);
  },
);

matchRouter.patch(
  '/:id',
  matchController.updateMatch,
);

matchRouter.patch(
  '/:id/finish',
  matchController.finishMatch,
);

export default matchRouter;
