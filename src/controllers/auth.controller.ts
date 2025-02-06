import { Request, Response } from 'express';
import { LogInDtoData } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export default class AuthController {
  async login(req: Request<{}, {}, LogInDtoData>, res: Response) {
    const { email, password } = req.body;

    const loginResponse = await authService.login({ email, password });

    res.status(200).json({
      msg: 'JWT token',
      response: loginResponse,
    });
  }

  async register(req: Request, res: Response) {}
}
