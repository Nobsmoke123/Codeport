import { Request, Response } from 'express';
import { LogInDtoData } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export default class AuthController {
  async login(req: Request<{}, {}, LogInDtoData>, res: Response) {
    const { email, password } = req.body;

    const loginResponse = await authService.login({ email, password });

    return res.status(200).send({
      data: {
        ...loginResponse,
      },
    });
  }

  async register(req: Request, res: Response) {}
}
