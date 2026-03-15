/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '../../generated/prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDashboardData(userId: string) {
    const [
      totalProjects,
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      latestTasks,
      userProjects,
    ] = await Promise.all([
      this.prismaService.project.count({
        where: {
          userId,
        },
      }),

      this.prismaService.task.count({
        where: {
          project: {
            userId,
          },
        },
      }),

      this.prismaService.task.count({
        where: {
          project: {
            userId,
          },
          status: TaskStatus.PENDING,
        },
      }),

      this.prismaService.task.count({
        where: {
          project: {
            userId,
          },
          status: TaskStatus.IN_PROGRESS,
        },
      }),

      this.prismaService.task.count({
        where: {
          project: {
            userId,
          },
          status: TaskStatus.COMPLETED,
        },
      }),

      this.prismaService.task.findMany({
        where: {
          project: {
            userId,
          },
        },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      }),

      this.prismaService.project.findMany({
        where: {
          userId,
        },
        include: {
          tasks: {
            where: {
              status: TaskStatus.PENDING,
            },
            select: {
              id: true,
            },
          },
        },
      }),
    ]);

    const topProjectsByPendingTasks = userProjects
      .map((project) => ({
        id: project.id,
        name: project.name,
        color: project.color,
        pendingTasksCount: project.tasks.length,
      }))
      .sort((a, b) => b.pendingTasksCount - a.pendingTasksCount)
      .slice(0, 3);

    return {
      totals: {
        projects: totalProjects,
        tasks: totalTasks,
      },
      tasksByStatus: {
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
      },
      latestTasks,
      topProjectsByPendingTasks,
    };
  }
}