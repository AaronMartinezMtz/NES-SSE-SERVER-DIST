"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async create(createAuthDto) {
        createAuthDto.fullName = createAuthDto.fullName.toLowerCase();
        createAuthDto.password = await (0, bcrypt_1.hash)(createAuthDto.password, 10);
        try {
            const newUser = await this.userModel.create(createAuthDto);
            return newUser;
        }
        catch (error) {
            if (error.code == 11000)
                throw new common_1.BadRequestException(`Ya exite un usuario llamado ${createAuthDto.username}`);
            else {
                console.log(error);
                throw new common_1.InternalServerErrorException('AVISAME DEME');
            }
        }
    }
    async login(loginAuthDto) {
        const { username, password } = loginAuthDto;
        const findUser = await this.userModel.findOne({ username });
        console.log(findUser);
        if (!findUser)
            throw new common_1.HttpException('Usuario/Contraseña Incorrectos', 403);
        const checkPassword = await (0, bcrypt_1.compare)(password, findUser.password);
        if (!checkPassword)
            throw new common_1.HttpException("Usuario/Contraseña incorrectas", 403);
        const payload = {
            id: findUser._id,
            role: findUser.role
        };
        const token = await this.jwtService.sign(payload);
        const data = {
            user: {
                username: findUser.username,
                fullname: findUser.fullName,
                role: findUser.role
            },
            token
        };
        return data;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map