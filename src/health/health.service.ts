import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      message: 'Task Management API is healthy',
      timestamp: new Date().toISOString(),
    };
  }
}