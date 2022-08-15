import { Controller, Get, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService
    ){}

    @Get()
    async findDashboard(){
        return {
            data: await this.dashboardService.findDashboard(),
            statusCode: HttpStatus.CREATED,
            massage : 'success'
        }
    }

    @Get('user/')
    async findCustomer(){
        return {
            data: await this.dashboardService.findCustomer()
        }
    }

}
