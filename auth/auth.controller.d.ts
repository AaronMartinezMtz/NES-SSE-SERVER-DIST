import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<import("../users/entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(loginAuthDto: LoginAuthDto): Promise<{
        user: {
            username: string;
            fullname: string;
            role: string;
        };
        token: string;
    }>;
}
