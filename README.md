Documentación del Proyecto
1. Descripción del proyecto

El proyecto consiste en una aplicación web para la gestión de proyectos y tareas personales. Cada usuario puede registrarse en el sistema, iniciar sesión y administrar sus propios proyectos. Dentro de cada proyecto es posible crear tareas, asignarles un estado y una prioridad.

El sistema permite organizar las tareas en tres estados principales:

    PENDING: tareas pendientes

    IN_PROGRESS: tareas en progreso

    COMPLETED: tareas finalizadas

Además, la aplicación incluye un dashboard que muestra información resumida del usuario autenticado, como:

    número total de proyectos

    número total de tareas

    distribución de tareas por estado

    últimas tareas creadas

    proyectos con más tareas pendientes

La aplicación sigue una arquitectura cliente-servidor, donde el frontend consume una API REST desarrollada en el backend.

2. Tecnologías utilizadas
Frontend

El frontend fue desarrollado con Next.js y React, utilizando componentes funcionales y hooks.

Tecnología	Versión
Next.js	16.1.6
React	19.2.3
React DOM	19.2.3
TypeScript	^5
Tailwind CSS	^4
React Hook Form	^7.71.2
Lucide React	^0.577.0
Funciones principales del frontend

El frontend se encarga de:

    manejar la interfaz de usuario

    enviar peticiones HTTP al backend

    gestionar la sesión del usuario mediante JWT

    mostrar el dashboard y los módulos de proyectos y tareas

Backend

El backend fue desarrollado con NestJS, utilizando una arquitectura modular típica del framework.

    Tecnología	Versión
    NestJS	11.0.1
    TypeScript	^5.7.3
    Prisma ORM	7.4.2
    PostgreSQL driver (pg)	^8.20.0
    Passport	^0.7.0
    Passport JWT	^4.0.1
    bcrypt	^6.0.0
    class-validator	^0.14.1

El backend expone una API REST que permite:

    registrar usuarios

    autenticar usuarios

    administrar proyectos

    administrar tareas

    generar datos del dashboard

    Base de datos

La base de datos utilizada es PostgreSQL, alojada en Supabase.

Supabase se utilizó únicamente como proveedor de base de datos gestionada.

3. Arquitectura del sistema

La aplicación sigue una arquitectura de tres capas:

Frontend (Next.js)
       │
       │ HTTP REST API
Backend (NestJS)
       │
       │ Prisma ORM
PostgreSQL (Supabase)

Flujo general:

    El usuario interactúa con la interfaz web.

    El frontend envía solicitudes HTTP al backend.

    El backend valida autenticación mediante JWT.

    El backend consulta o modifica datos usando Prisma.

Los resultados se devuelven al frontend.

4. Modelo de datos

El modelo de datos está definido en Prisma y consta de tres entidades principales.

User

Representa a los usuarios del sistema.

Campos principales:

    id

    name

    email

    password

    role

    createdAt

    updatedAt

Relación:

Un usuario puede tener múltiples proyectos.

Project

Representa un proyecto creado por un usuario.

Campos principales:

    id

    name

    description

    color

    createdAt

    updatedAt

    userId

Relación:

Un proyecto pertenece a un usuario y puede contener múltiples tareas.

Task

Representa una tarea asociada a un proyecto.

Campos principales:

    id

    title

    description

    status

    priority

    createdAt

    updatedAt

    projectId

5. Endpoints principales de la API

El backend expone varios endpoints REST.

Autenticación
    POST /auth/register
    POST /auth/login
    GET /auth/profile
Proyectos
    GET /projects
    POST /projects
    PATCH /projects/:id
    DELETE /projects/:id
Tareas
    GET /tasks
    POST /tasks
    PATCH /tasks/:id
    PATCH /tasks/:id/status
    DELETE /tasks/:id
Dashboard
    GET /dashboard

Este endpoint devuelve:

    totales de proyectos y tareas

    distribución de tareas por estado

    últimas tareas creadas

    proyectos con más tareas pendientes

6. Decisiones técnicas
Uso de Next.js

Se eligió Next.js para el frontend debido a su sistema de rutas basado en archivos y su soporte nativo para React. Esto permitió organizar la aplicación separando layouts públicos (login y registro) de layouts privados (dashboard y módulos internos).

Uso de NestJS

NestJS fue elegido como framework backend porque proporciona una arquitectura modular clara basada en controladores, servicios y módulos. Esto facilita la organización del código y permite escalar el sistema de manera ordenada.

Uso de Prisma ORM

Se utilizó Prisma para la interacción con la base de datos PostgreSQL. Prisma ofrece un cliente fuertemente tipado que se integra muy bien con TypeScript y permite manejar relaciones entre entidades de manera sencilla.

Uso de Supabase

Supabase se utilizó como proveedor de PostgreSQL gestionado. Esto permite disponer de una base de datos en la nube sin necesidad de administrar infraestructura propia.

Decisión sobre autenticación

Aunque Supabase ofrece un sistema de autenticación integrado, en este proyecto se decidió implementar la autenticación directamente en el backend utilizando JWT con Passport. Esto permitió un mayor control sobre la lógica de autenticación y autorización.

7. Configuración de Supabase

    Crear una cuenta en Supabase.

    Crear un nuevo proyecto.

    Obtener la cadena de conexión PostgreSQL.

    Configurar la variable de entorno en el backend.

Ejemplo:

    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/postgres
8. Levantar el entorno de desarrollo
Backend

Instalar dependencias:

    npm install

Ejecutar servidor en modo desarrollo:

    npm run start:dev

El backend estará disponible en:

    http://localhost:4000

Frontend

Instalar dependencias:

    pnpm install

Ejecutar frontend:

    pnpm run dev

El frontend estará disponible en:

    http://localhost:3000
9. Usuario de prueba
Ejecutamos este comandos para generar datos

npx prisma db seed


| Nombre        | Email             | Password |
| ------------- | ----------------- | -------- |
| Usuario Demo  | demo@test.com     | 123456   |
| Juan Perez    | juan@test.com     | 123456   |
| Maria Lopez   | maria@test.com    | 123456   |
| Carlos Gomez  | carlos@test.com   | 123456   |
| Ana Rodriguez | ana@test.com      | 123456   |


10. Capturas de pantalla

Las siguientes capturas corresponden a la interfaz del sistema.

Pantalla de login
![Login](./images/login.png)

Dashboard
![Dashboard](./images/dashboard.png)

Gestión de proyectos
![Projects](./images/projects.png)

Gestión de tareas
![Tasks](./images/tasks.png)

11. Problemas conocidos

Durante el desarrollo se identificaron algunos problemas y limitaciones técnicas:

1. Problema de hidratación en Next.js

Inicialmente se presentó un error de hidratación en Next.js al intentar acceder directamente a localStorage durante el renderizado de componentes. Esto ocurre porque localStorage solo está disponible en el entorno del navegador y no durante el renderizado del servidor.

El problema se solucionó centralizando la gestión de sesión mediante un AuthContext, el cual se inicializa únicamente en el cliente y permite compartir el estado de autenticación entre los componentes de la aplicación.

2. Autenticación implementada con JWT en lugar de Supabase Auth

El requerimiento RT-07 indicaba utilizar Supabase Auth para la autenticación del sistema. Sin embargo, en este proyecto se implementó un sistema de autenticación propio utilizando NestJS, Passport JWT, bcrypt y JSON Web Tokens (JWT).

Esta decisión se tomó debido a que el proyecto ya estaba estructurado con una arquitectura cliente-servidor donde el backend gestiona toda la lógica de seguridad, autenticación y autorización.

El sistema implementado permite:

registro de usuarios

inicio de sesión

generación y validación de tokens JWT

protección de endpoints mediante guards

obtención del perfil del usuario autenticado

Supabase fue utilizado en el proyecto como proveedor de base de datos PostgreSQL gestionada, pero no se utilizó su módulo de autenticación.

Se reconoce que esta implementación no cumple literalmente el requerimiento RT-07, aunque la funcionalidad de autenticación se encuentra completamente implementada y operativa.