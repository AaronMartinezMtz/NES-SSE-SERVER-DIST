import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
