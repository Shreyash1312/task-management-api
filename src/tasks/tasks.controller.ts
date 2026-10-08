import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  getTasks(@Req() request: AuthenticatedRequest) {
    return this.tasksService.getTasks(
      request.user.userId,
    );
  }

  @Post()
  createTask(
    @Req() request: AuthenticatedRequest,
    @Body('title') title: string,
  ) {
    return this.tasksService.createTask(
      request.user.userId,
      title,
    );
  }

  @Post(':id/toggle')
  toggleTask(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.tasksService.toggleTask(
      request.user.userId,
      Number(id),
    );
  }

  @Delete(':id')
  deleteTask(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.tasksService.deleteTask(
      request.user.userId,
      Number(id),
    );
  }
}