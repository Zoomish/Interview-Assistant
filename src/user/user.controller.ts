import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
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
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }
}
