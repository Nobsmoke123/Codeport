import { LogInDtoData } from '../dtos/login.dto';

export class AuthService {
  async login(logInData: LogInDtoData): Promise<void> {
    try {
      const { email, password } = logInData;
      
    } catch (error) {
      console.log(error);
    }
  }

  async register(): Promise<void> {}
}
