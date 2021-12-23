import { Controller, Get, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { AttendanceDomain } from '../domain/attendance.domain';

@Controller('/attendances')
@Service()
export class AttendanceController {
    constructor(private attendanceDomain: AttendanceDomain) {}

    @Get('/')
    async getAll(@Req() request: any, @Res() response: any) {
        const data = await this.attendanceDomain.list();
        return {
            success: true,
            data
        };
    }
}
