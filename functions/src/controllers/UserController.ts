import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Res
} from 'routing-controllers';
import { Service } from 'typedi';
import { UserDomain } from '../domain/users.domain';

@Controller()
@Service()
export class UserController {
    constructor(private userDomain: UserDomain) {}

    @Get('/users')
    async getAll(@Req() request: any, @Res() response: any) {
        const data = await this.userDomain.list();
        return {
            success: true,
            data
        };
    }

    @Get('/users/:id')
    getOne(@Param('id') id: number) {
        return 'This action returns user #' + id;
    }

    @Post('/users')
    post(@Body() user: any) {
        return 'Saving user...';
    }

    @Put('/users/:id')
    put(@Param('id') id: number, @Body() user: any) {
        return 'Updating a user...';
    }

    @Delete('/users/:id')
    remove(@Param('id') id: number) {
        return 'Removing user...';
    }
}
