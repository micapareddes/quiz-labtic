<div align="center">

<img src="/frontend/src/img/logo-icon.svg" width=60px>

# Polvo Quiz

**Una plataforma universitaria de quizzes y evaluaciones, desarrollada de principio a fin.**

[Sitio online](https://polvinho.netlify.app/src/pages/login/index.html) · [Documentación](https://micapareddes.notion.site/Documentaci-n-Polvinho-3a633e35d72a80959589d2404e465e84?source=copy_link) · [Diseño](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-LabTIC)

[English](README.md) · [Português](README.pt-BR.md)

</div>

---

## Sobre

Polvo Quiz centraliza la gestión de quizzes y evaluaciones entre estudiantes y profesores.
Los estudiantes pueden consultar sus materias, realizar quizzes y acceder a sus calificaciones y respuestas.
Los profesores crean y administran quizzes. Los administradores gestionan estudiantes, profesores y materias.

Fue desarrollado en **LabTIC**, un grupo de investigación formado por profesores de ESAG/UDESC registrado en CNPq
desde 2002, como una experiencia práctica de desarrollo de software: nuestros líderes asumieron el rol de clientes,
y realizamos todo el ciclo, desde entrevistas de levantamiento de requisitos hasta planificación, modelado de datos,
backend, frontend y entrega.

La arquitectura fue diseñada pensando en la escalabilidad futura. Los quizzes son la primera funcionalidad del
sistema, no el único tipo de recurso que debería soportar.

El proyecto está dividido en dos repositorios independientes, `polvo-front` y `polvo-back`, permitiendo que
frontend y backend se desplieguen de forma independiente.

## Tecnologías

**Backend** Node.js · MongoDB · Mongoose  
**Frontend** HTML · JavaScript puro · Tailwind CSS  
**Diseño** Figma

## Funcionalidades

**Estudiantes**
- Ver las materias del semestre
- Realizar quizzes publicados por los profesores
- Consultar notas y respuestas cuando sean liberadas por el profesor
- Consultar notas y respuestas de cada intento en quizzes con múltiples intentos
- Cambiar contraseña

**Profesores**
- Crear quizzes como exámenes, ejercicios o simulacros
- Guardar quizzes como borradores y editarlos posteriormente
- Eliminar quizzes
- Ver quién respondió, junto con sus notas y respuestas
- Cambiar contraseña

**Administradores**
- CRUD completo de estudiantes, profesores y materias
- Editar o eliminar quizzes creados por profesores

## Restricciones

Aplicadas por la API, no solamente por la interfaz:

- Los administradores nunca tienen acceso a la contraseña de los usuarios.
- Los administradores no crean la contraseña inicial; esta se genera automáticamente durante el registro.
- El rol de un usuario queda definido después del registro. Un profesor no puede convertirse en estudiante,
  ni viceversa.
- Cambiar de rol requiere crear una nueva cuenta con el rol deseado.

## Diseño

El objetivo era crear una plataforma educativa simple y atractiva, sin la complejidad normalmente presente en
herramientas similares. Como el equipo estaba compuesto por desarrolladores principiantes, el diseño evita
deliberadamente CSS avanzado y librerías externas, manteniendo el enfoque en el aprendizaje en lugar de
enfrentarse a hojas de estilo complejas.

La paleta violeta y amarilla está inspirada en la propia plataforma universitaria Polvo, adaptada hacia una
identidad más ligera y divertida. El resultado busca equilibrar simplicidad, funcionalidad y atractivo visual,
sin sobrecargar al usuario.

[Ver el diseño en Figma](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-LabTIC)

## Estructura del proyecto

```

backend/                     frontend/src/
├── constants/               ├── auth/
├── controllers/             ├── components/
├── db/                      ├── functions/
├── middleware/              ├── img/
├── models/                  ├── pages/
├── routes/                  │   ├── admin/  alumno/
├── utils/                   │   ├── profesor/  login/  404/
├── servidor.js              ├── utils/
└── ServidorError.js         ├── validations/
└── styles/

```

## Enlaces

[Documentación](https://micapareddes.notion.site/LabTIC-Quiz-f9cd710a7509405dbcb5d88ed7f7e56e) · [Diseño](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-LabTIC) · [Sitio online](https://polvinho.netlify.app/src/pages/login/index.html)
