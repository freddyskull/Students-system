<p align="center">
  <img src="https://drive.google.com/drive-viewer/AKGpihY8qSP3mAf6RqDp0mAT8UTYqI92Ait2NRczd6v32Jph123gKlO2bdJZQADu4abhEbFj8iM5YbxvLLHhV9BOc0Ufy38FqntXRE4=w1920-h925" alt="Tecnologías utilizadas">
</p>

# Tecnologías utilizadas

- **React Js + vite**
- **ChadCn**
- **NestJs**
- **Prisma**
- **SQLite**

# Students Project

Este proyecto está diseñado para gestionar información de estudiantes. Proporciona herramientas para registrar, actualizar, eliminar y consultar datos de estudiantes de manera eficiente. Además, genera constancias de estudios y constancias de retiro en formato PDF.

## Funcionalidades principales

- **Registro de estudiantes**: Permite agregar nuevos estudiantes al sistema.
- **Gestión de datos**: Facilita la actualización y eliminación de información de estudiantes existentes.
- **Consultas**: Realiza búsquedas y muestra información detallada de los estudiantes.
- **Generación de constancias**: Crea constancias de estudios y constancias de retiro en formato PDF.

## ¿Quién puede beneficiarse de este proyecto?

Este proyecto es ideal para instituciones educativas, profesores o administradores que necesitan mantener un registro organizado y accesible de sus estudiantes.

## ¿Cómo usarlo?

1. **Clona el repositorio**:

```bash
git clone https://github.com/tu-usuario/students.git
cd students
```

2. **Instala las dependencias** (en el backend y el frontend):

```bash
npm install
```

3. **Ejecuta el proyecto**:

   - **Backend**:

     1. Genera la base de datos con Prisma usando el comando `npx prisma migrate dev`.
     2. (Opcional) Genera datos de ejemplo con `npm run seed`.
     3. Inicia el servidor con `npm start`. El backend estará disponible en el puerto `4000`.

   - **Frontend**:
     1. Instala las dependencias con `npm install`.
     2. Inicia el servidor con `npm run dev`. El frontend estará disponible en el puerto `3000`.

**Comandos para el backend**:

```bash
npx prisma migrate dev
npm run seed
npm start
```

**Comandos para el frontend**:

```bash
npm run dev
```

4. **Accede a la aplicación** desde tu navegador:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:4000`

## Contribuciones

Si deseas contribuir, abre un issue o envía un pull request. ¡Toda ayuda es bienvenida!

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
