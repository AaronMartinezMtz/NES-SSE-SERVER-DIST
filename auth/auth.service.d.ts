import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    create(createAuthDto: CreateAuthDto): Promise<User & {
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
