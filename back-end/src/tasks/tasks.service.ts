/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus, TaskPriority } from '../../generated/prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    console.log('USER ID DEL TOKEN:', userId);
    console.log('PROJECT ID RECIBIDO:', createTaskDto.projectId);
    const proyecto = await this.prismaService.project.findUnique({
      where: { id: createTaskDto.projectId },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyecto.userId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para crear tareas en este proyecto',
      );
    }

    const nuevaTarea = await this.prismaService.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status ?? TaskStatus.PENDING,
        priority: createTaskDto.priority ?? TaskPriority.MEDIUM,
        projectId: createTaskDto.projectId,
      },
    });

    return nuevaTarea;
  }

  async findAll(userId: string, status?: string, priority?: string) {
    const tareas = await this.prismaService.task.findMany({
      where: {
        project: {
          userId: userId,
        },
        ...(status && { status: status as TaskStatus }),
        ...(priority && { priority: priority as TaskPriority }),
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
    });

    return tareas;
  }

  async findOne(id: string, userId: string) {
    const tarea = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        project: true,
      },
    });

    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }

    if (tarea.project.userId !== userId) {
      throw new ForbiddenException('No tienes permiso para ver esta tarea');
    }

    return tarea;
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    const tarea = await this.prismaService.task.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }

    if (tarea.project.userId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para modificar esta tarea',
      );
    }

    const tareaActualizada = await this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });

    return tareaActualizada;
  }

  async quickUpdateStatus(id: string, userId: string, status: string) {
    const tarea = await this.prismaService.task.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }

    if (tarea.project.userId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para modificar esta tarea',
      );
    }

    const tareaActualizada = await this.prismaService.task.update({
      where: { id },
      data: {
        status: status as TaskStatus,
      },
    });

    return tareaActualizada;
  }

  async remove(id: string, userId: string) {
    const tarea = await this.prismaService.task.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }

    if (tarea.project.userId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar esta tarea',
      );
    }

    await this.prismaService.task.delete({
      where: { id },
    });

    return {
      message: 'Tarea eliminada correctamente',
    };
  }
}
