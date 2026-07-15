
</div>
    <div align=center>
    <img src="/frontend/src/img/logo-icon.svg" width=60px>
    <h1>Polvo Quiz</h1>
</div>

<p align="center">
  🇧🇷 <a href="#-português">Português</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  🇺🇸 <a href="#-english">English</a>
</p>

## [🔗 Link de acesso | Access link](https://polvinho.netlify.app)

![Polvo Capa](/frontend/src/img/capa.png)

## Index

🇧🇷 Português
- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Funcinalidades](#funcionalidades)
- [Restrições](#restrições)
- [Design](#design)
- [Organização do Projeto](#organização-do-projeto)
- [Links](#links)

🇺🇸 English
- [About](#about)
- [Technologies](#technologies)
- [Features](#features)
- [Restrictions](#restrictions)
- [Design](#design-1)
- [Project Structure](#project-structure)
- [Links](#links-1)

## 🇧🇷 Português
## Sobre

O Polvo Quiz é uma plataforma universitária projetada para facilitar a interação acadêmica entre alunos e professores através do gerenciamento centralizado de quizzes e avaliações. A plataforma permite que alunos visualizem disciplinas, realizem quizzes e acessem suas notas e gabaritos, enquanto professores podem criar e gerenciar quizzes. Administradores são responsáveis por gerenciar alunos, professores e disciplinas, garantindo a organização e funcionamento da plataforma. O design do software visa escalabilidade futura, permitindo a adição de novas funcionalidades conforme necessário.

O projeto está dividido em dois repositórios independentes:
[polvo-front](https://github.com/micapareddes/polvo-front) e
[polvo-back](https://github.com/micapareddes/polvo-back).
A separação foi definida pela equipe porque os deploys de frontend
e backend são independentes entre si.

## Tecnologias
- **Backend:**
  - Node.js
  - MongoDB
  - Mongoose
- **Frontend:**
  - HTML
  - JavaScript Vanilla
  - TailwindCSS
- **Design:**
  - Figma

## Funcionalidades

**Alunos**

- Visualizar disciplinas do semestre.
- Realizar quizzes postados pelos professores.
- Visualizar notas e gabaritos de quizzes (se disponibilizados pelos professores).
- Visualizar notas e gabaritos de cada tentativa em quizzes com múltiplas tentativas.
- Alterar senha.

**Professores**

- Criar novos quizzes do tipo prova, exercício ou simulado.
- Salvar quizzes como rascunho.
- Editar quizzes.
- Eliminar quizzes.
- Visualizar quem respondeu aos quizzes.
- Ver notas e gabaritos das respostas dos alunos.
- Alterar senha.

**Administradores**

- Cadastrar e gerenciar alunos, professores e disciplinas (CRUD completo).
- Editar ou eliminar quizzes criados por professores.

## Restrições

- O administrador não possui acesso à senha criada pelo aluno.
- O administrador não cria a senha inicial do usuário, a mesma é gerada automaticamente após o cadastro.
- Após o cadastro de um professor ou aluno, este não pode trocar de papel (um professor não pode virar aluno e vice-versa).
- Caso seja necessário mudar de papel, deve ser criado um novo cadastro com o papel desejado.


## Design

O design deste projeto foi criado com o objetivo de desenvolver uma plataforma educacional simples, mas divertida, sem as complexidades que normalmente encontramos em soluções similares. Devido a ser um projeto para uma equipe de iniciantes, queria evitar o uso de CSS avançado ou bibliotecas externas, focando em uma experiência de aprendizado fácil e acessível.

Escolhi as cores roxo e amarelo, inspirada na paleta da universidade (Polvo), mas fiz algumas adaptações para dar um toque mais leve e lúdico, alinhando com a identidade visual minimalista que eu buscava. O design foi pensado para ser funcional e visualmente atraente, sem sobrecarregar o usuário com elementos desnecessários.

Durante o processo, enfrentei o desafio de equilibrar a simplicidade técnica com um design visualmente interessante. Evitei detalhes complexos e mantive o foco na clareza da navegação e no uso prático. O resultado final reflete essa busca por um equilíbrio entre a criatividade e a simplicidade, oferecendo uma experiência intuitiva e agradável para o usuário, sem comprometer o foco no aprendizado.

#### [🔗 Link ao design no figma](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Polvo-Quiz-(LabTIC)?node-id=4174-8239&t=kWzpnkKfQa8pRwit-1)

## Organização do Projeto

```bash
backend/
│
├── constants/
│
├── controllers/
│
├── db/       
│
├── middleware/
│
├── models/ 
│
├── routes/
│
├── utils/     
│
├── servidor.js
│
└── ServidorError.js
│
frontend/
│
└── src/
    │
    ├── auth/
    │
    ├── components/
    │
    ├── functions/
    │
    ├── img/
    │   └── icones/
    │
    ├── pages/  
    │   ├── admin/
    │   ├── aluno/    
    │   ├── professor/
    │   └── login/         
    │   └── 404/           
    │
    │
    ├── utils/ 
    │
    ├── validations/ 
    │
    └── styles/            
```

## Links
[Documentação](https://www.notion.so/micapareddes/LabTIC-Quiz-f9cd710a7509405dbcb5d88ed7f7e56e) •
[Presentação do projeto](https://www.behance.net/gallery/202116443/Polvo) • 
[Design](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Polvo-Quiz-(LabTIC)?node-id=4174-8239&t=kWzpnkKfQa8pRwit-1) •
[Site](https://polvinho.netlify.app)

## 🇺🇸 English
## About

**Polvo Quiz** is a university platform designed to facilitate academic interaction between students and teachers through centralized quiz and assessment management.

The platform allows students to view subjects, complete quizzes, and access their grades and answer keys, while teachers can create and manage quizzes. Administrators are responsible for managing students, teachers, and subjects, ensuring the organization and proper functioning of the platform.

The software was designed with future scalability in mind, allowing new features to be added as needed.

The project is divided into two independent repositories:

[polvo-front](https://github.com/micapareddes/polvo-front) and  [polvo-back](https://github.com/micapareddes/polvo-back).

The separation was defined by the team because frontend and backend deployments are independent.

---

## Technologies

- **Backend:**
  - Node.js
  - MongoDB
  - Mongoose

- **Frontend:**
  - HTML
  - Vanilla JavaScript
  - TailwindCSS

- **Design:**
  - Figma

---

## Features

**Students**

- View semester subjects.
- Take quizzes created by teachers.
- View quiz grades and answer keys when available.
- View grades and answer keys from each attempt in quizzes with multiple attempts.
- Change password.

**Teachers**

- Create new quizzes as exams, exercises, or simulations.
- Save quizzes as drafts.
- Edit quizzes.
- Delete quizzes.
- View students who answered quizzes.
- View students' grades and answer keys.
- Change password.

**Administrators**

- Register and manage students, teachers, and subjects (full CRUD).
- Edit or delete quizzes created by teachers.

---

## Restrictions

- Administrators do not have access to student passwords.
- Administrators do not create the user's initial password; it is automatically generated after registration.
- Users cannot change their role after registration.
- If a role change is needed, a new account with the desired role must be created.

---

## Design

The design of this project was created with the goal of developing a simple but engaging educational platform, avoiding unnecessary complexity found in similar solutions.

Since this was a project developed by a beginner team, the focus was to avoid advanced CSS or external libraries, prioritizing an accessible and easy-to-understand learning experience.

The purple and yellow color palette was inspired by the university's identity (Polvo), with adaptations to create a lighter and more playful visual style.

The design aimed to balance simplicity, functionality and visual appeal, providing an intuitive experience without overwhelming users.

#### [🔗 Figma design](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Polvo-Quiz-(LabTIC)?node-id=4174-8239&t=kWzpnkKfQa8pRwit-1)

---

## Project Structure

```bash
backend/
│
├── constants/
│
├── controllers/
│
├── db/       
│
├── middleware/
│
├── models/ 
│
├── routes/
│
├── utils/     
│
├── servidor.js
│
└── ServidorError.js
│
frontend/
│
└── src/
    │
    ├── auth/
    │
    ├── components/
    │
    ├── functions/
    │
    ├── img/
    │   └── icones/
    │
    ├── pages/  
    │   ├── admin/
    │   ├── aluno/    
    │   ├── professor/
    │   └── login/         
    │   └── 404/           
    │
    │
    ├── utils/ 
    │
    ├── validations/ 
    │
    └── styles/            
```


---

## Links

[Documentation](https://www.notion.so/micapareddes/LabTIC-Quiz-f9cd710a7509405dbcb5d88ed7f7e56e) • [Project Presentation](https://www.behance.net/gallery/202116443/Polvo) •  [Design](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Polvo-Quiz-(LabTIC)?node-id=4174-8239&t=kWzpnkKfQa8pRwit-1) •  [Website](https://polvinho.netlify.app)
