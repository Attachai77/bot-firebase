import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Res,
    HeaderParams
} from 'routing-controllers';
import { Service } from 'typedi';
import { LeaveRequestDomain } from '../domain/leaveRequest.domain';

@Controller('/leave-request')
@Service()
export class LeaveRequestController {
    constructor(private leaveRequestDomain: LeaveRequestDomain) {}

    @Get('/')
    async getAll(@Req() request: any, @Res() response: any) {
        const data = await this.leaveRequestDomain.getRequestLeave();

        return response.json({
            success: true,
            data
        });
    }

    @Get('/:id')
    async getOne(@Param('id') id: string, @Res() response: any) {
        const data = await this.leaveRequestDomain.getById(id);

        return response.json({
            success: true,
            data
        });
    }

    @Post('/')
    async post(@Body() body: any, @HeaderParams() headers: any) {
        try {
            const data = await this.leaveRequestDomain.requestLeave(
                body,
                headers
            );
            return {
                success: true,
                data
            };
        } catch (error) {
            let errorMessage = 'Failed to do something exceptional';
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            return {
                success: false,
                error: errorMessage
            };
        }
    }

    @Put('/:id')
    put(@Param('id') id: number, @Body() user: any, @Res() response: any) {
        const data = this.leaveRequestDomain.getRequestLeave();
        response.data = data;
    }

    @Delete('/:id')
    remove(@Param('id') id: number) {
        return 'Removing user...';
    }
}
