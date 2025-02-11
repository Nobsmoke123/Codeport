import { Request, Response } from 'express';
import { LogInDtoData, RegisterDtoData } from '../dtos/auth.dto';
import { AuthService } from '../services';

/**
 * AuthController handles authentication-related operations such as login and registration.
 */
export default class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  /**
   * Login method
   * @param req Request<{},{}, LogInDtoData>
   * @param res Response
   * @returns Promise<Response>
   */
  async login(req: Request<{}, {}, LogInDtoData>, res: Response) {
    const { email, password } = req.body;
    const loginResponse = await this.authService.login({ email, password });

    return res.status(200).json({
      data: {
        ...loginResponse,
      },
    });
  }

  /**
   * Register method
   * @param req Request<{},{},RegisterDtoData>
   * @param res Response
   * @returns Promise<Response>
   */
  async register(req: Request<{}, {}, RegisterDtoData>, res: Response) {
    const registerResponse = await this.authService.register(req.body);

    return res.status(201).json(registerResponse);
  }
}
