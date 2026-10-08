import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getTasks(userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createTask(
    userId: number,
    title: string,
  ) {
    return this.prisma.task.create({
      data: {
        title,
        userId,
      },
    });
  }

  async toggleTask(
    userId: number,
    taskId: number,
  ) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        completed: !task.completed,
      },
    });
  }

  async deleteTask(
    userId: number,
    taskId: number,
  ) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}