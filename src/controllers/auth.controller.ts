import { Request, Response } from 'express';
import { AuthService } from '../services';
import { injectable } from 'tsyringe';
import { LoginInput, RegisterInput } from '../schemas/auth.schema';

/**
 * AuthController handles authentication-related operations such as login and registration.
 */
@injectable()
export default class AuthController {
  // private readonly authService: AuthService;

  // constructor() {
  //   this.authService = new AuthService();
  //   // this.login = this.login.bind(this);
  //   // this.register = this.register.bind(this);
  // }

  constructor(private readonly authService: AuthService) {}

  /**
   * Login method
   * @param req Request<{},{}, LogInDtoData>
   * @param res Response
   * @returns Promise<Response>
   */
  login = async (req: Request<{}, {}, LoginInput['body']>, res: Response) => {
    const { email, password } = req.body;
    const loginResponse = await this.authService.login({ email, password });

    res.status(200).json({
      data: {
        ...loginResponse,
      },
    });
    return;
  };

  /**
   * Register method
   * @param req Request<{},{},RegisterDtoData>
   * @param res Response
   * @returns Promise<Response>
   */
  register = async (
    req: Request<{}, {}, RegisterInput['body']>,
    res: Response
  ) => {
    const registerResponse = await this.authService.register(req.body);
    res.status(201).json(registerResponse);
    return;
  };
}
