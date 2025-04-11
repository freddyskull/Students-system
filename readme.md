# Students Project

Este proyecto está diseñado para gestionar información de estudiantes. Proporciona herramientas para registrar, actualizar, eliminar y consultar datos de estudiantes de manera eficiente, de igual manera el proyecto crea constancias de estudios para los estudiantes las cuales son generadas como out en tipo PDF.

## ¿Qué hace este proyecto?

- **Registro de estudiantes**: Permite agregar nuevos estudiantes al sistema.
- **Gestión de datos**: Actualiza y elimina información de estudiantes existentes.
- **Consultas**: Busca y muestra información detallada de los estudiantes.
- **Genera constancias**: genera constancias de estudios y constancias de retiro.

## ¿Para qué sirve?

Este proyecto es útil para instituciones educativas, profesores o administradores que necesitan mantener un registro organizado y accesible de sus estudiantes.

## ¿Cómo usarlo?

1. **Clona el repositorio**:

```bash
git clone https://github.com/tu-usuario/students.git
cd students
```

2. **Instala las dependencias** (si aplica):
   tanto en el proyecto backend como en el frontend

```bash
npm install
```

3. **Ejecuta el proyecto**:
   Para ejecutar el proyecto en backend primero hay que generar la base de datos con prisma, haciendo uso del comando npx prisma migrate dev, luego npm run seed (que es opcional) para generar datos de ejemplo dentro del backend, luego ejecutar npm run start este se ejecutará en el puerto: 4000 para el proyecto de backend.
   para el proyecto de frontend solo se ejecuta npm install y npm run dev y este se ejecutara en el puerto :3000

```bash
npm start
npx prisma migrate dev
npm run seed
npm run dev
```

4. **Accede a la aplicación** desde tu navegador en `http://localhost:3000` para el front-end o al `http://localhost:4000` para el backend.

## Contribuciones

Si deseas contribuir, por favor abre un issue o envía un pull request. ¡Toda ayuda es bienvenida!

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
