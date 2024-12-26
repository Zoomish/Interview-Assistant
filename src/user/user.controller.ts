import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AdminGuard } from 'src/guard/admin.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    AAA() {
        return {}
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, AdminGuard)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }
}
