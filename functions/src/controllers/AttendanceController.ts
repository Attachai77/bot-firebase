import {
    Body,
    Controller,
    Get,
    HeaderParams,
    Post,
    Req,
    Res
} from 'routing-controllers';
import { Service } from 'typedi';
import { AttendanceDomain } from '../domain/attendance.domain';

@Controller('/attendances')
@Service()
export class AttendanceController {
    constructor(private attendanceDomain: AttendanceDomain) {}

    @Get('/')
    async getAll(@Res() response: any) {
        const data = await this.attendanceDomain.list();
        return {
            success: true,
            data
        };
    }

    @Post('/clock-in')
    async clockIn(
        @Body() body: any,
        @HeaderParams() headers: any,
        @Res() res: any
    ) {
        const data = await this.attendanceDomain.clockIn(headers, body);
        return res.json({
            success: true,
            data
        });
    }

    @Post('/clock-out')
    async clockOut(
        @Body() body: any,
        @HeaderParams() headers: any,
        @Res() res: any
    ) {
        const data = await this.attendanceDomain.clockOut(headers, body);
        return res.json({
            success: true,
            data
        });
    }
}
