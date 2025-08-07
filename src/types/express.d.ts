import { JwtPayloadCustom } from './jwt';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadCustom;
    }
  }
}
