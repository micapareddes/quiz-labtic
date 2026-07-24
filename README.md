<div align="center">
<img src="/frontend/src/img/logo-icon.svg" width=60px>

# Polvo Quiz

**A university platform for quizzes and assessments, built end to end.**

[Live site](https://polvinho.netlify.app/src/pages/login/index.html) · [Documentation](https://micapareddes.notion.site/Polvinho-Documentation-3a633e35d72a80d98451e31f24de9b20?source=copy_link) · [Design](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-LabTIC)  · [Behance](https://www.behance.net/portfolio/editor?project_id=253210297) 

[Português](README.pt-BR.md) · [Español](README.es.md)

</div>

---

## About

Polvo Quiz centralizes quiz and assessment management between students and teachers.
Students see their subjects, take quizzes, and access grades and answer keys. Teachers
create and manage quizzes. Admins manage students, teachers, and subjects.

It was built at **LabTIC**, a research group of ESAG/UDESC professors registered with CNPq
since 2002, as the lab's hands-on way of teaching software development: our leads acted as
the client, and we ran the full cycle from requirement interviews through planning, data
modeling, backend, frontend, and delivery.

The architecture was designed for future scalability. Quizzes are the first feature, not the
only one the system should ever support.

The project lives in two independent repositories, `polvo-front` and `polvo-back`, because
frontend and backend deploy independently.

## Technologies

**Backend** Node.js · MongoDB · Mongoose
**Frontend** HTML · Vanilla JavaScript · Tailwind CSS
**Design** Figma

## Features

**Students**
- View the semester's subjects
- Take quizzes posted by teachers
- View grades and answer keys when released by the teacher
- View grades and answer keys for each attempt on multi-attempt quizzes
- Change password

**Teachers**
- Create quizzes as exams, exercises, or mock tests
- Save quizzes as drafts and edit them
- Delete quizzes
- See who answered, with their grades and answer keys
- Change password

**Admins**
- Full CRUD over students, teachers, and subjects
- Edit or delete quizzes created by teachers

## Restrictions

Enforced by the API, not just the interface:

- Admins never have access to a user's password.
- Admins don't create the initial password; it's generated automatically on registration.
- A user's role is fixed after registration. A teacher cannot become a student, or vice versa.
- Changing role means creating a new account with the desired role.

## Design

The goal was a simple but engaging educational platform, without the complexity usually found
in similar tools. Since the team were beginners, the design deliberately avoids advanced CSS
and external libraries, keeping the focus on learning rather than on fighting the stylesheet.

The purple and yellow palette is drawn from the university's own platform, Polvo, adapted
toward a lighter, more playful identity. The result aims at a balance between simplicity,
function, and visual appeal, without overwhelming the user.

[View the design on Figma](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-LabTIC)

## Project structure

```
backend/                     frontend/src/
├── constants/               ├── auth/
├── controllers/             ├── components/
├── db/                      ├── functions/
├── middleware/              ├── img/
├── models/                  ├── pages/
├── routes/                  │   ├── admin/  aluno/
├── utils/                   │   ├── professor/  login/  404/
├── servidor.js              ├── utils/
└── ServidorError.js         ├── validations/
                             └── styles/
```

