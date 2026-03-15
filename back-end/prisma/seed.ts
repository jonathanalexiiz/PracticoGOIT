import {
  PrismaClient,
  TaskStatus,
  TaskPriority,
} from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Ejecutando seed...');

  const password = await bcrypt.hash('123456', 10);

  const usersData = [
    { name: 'Usuario Demo', email: 'demo@test.com' },
    { name: 'Juan Perez', email: 'juan@test.com' },
    { name: 'Maria Lopez', email: 'maria@test.com' },
    { name: 'Carlos Gomez', email: 'carlos@test.com' },
    { name: 'Ana Rodriguez', email: 'ana@test.com' },
  ];

  for (const userData of usersData) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        name: userData.name,
        email: userData.email,
        password,
        role: 'user',
      },
    });

    console.log(`👤 Usuario creado: ${user.email}`);

    // Crear proyectos para cada usuario
    const project1 = await prisma.project.create({
      data: {
        name: 'Proyecto Backend',
        description: 'Desarrollo del API',
        color: '#6366f1',
        userId: user.id,
      },
    });

    const project2 = await prisma.project.create({
      data: {
        name: 'Proyecto Frontend',
        description: 'Desarrollo de la interfaz',
        color: '#22c55e',
        userId: user.id,
      },
    });

    console.log('📁 Proyectos creados');

    const tasks = [
      {
        title: 'Configurar proyecto',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.HIGH,
        projectId: project1.id,
      },
      {
        title: 'Crear endpoints',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        projectId: project1.id,
      },
      {
        title: 'Implementar autenticación',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        projectId: project1.id,
      },
      {
        title: 'Diseñar login',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.MEDIUM,
        projectId: project2.id,
      },
      {
        title: 'Crear dashboard',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        projectId: project2.id,
      },
      {
        title: 'Implementar CRUD proyectos',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        projectId: project2.id,
      },
      {
        title: 'Implementar CRUD tareas',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        projectId: project2.id,
      },
    ];

    await prisma.task.createMany({
      data: tasks,
    });

    console.log('📝 Tareas creadas');
  }

  console.log('✅ Seed completado');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
