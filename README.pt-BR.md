<div align="center">

  <img src="/frontend/src/img/logo-icon.svg" width=60px>

# Polvo Quiz

**Uma plataforma universitária de quizzes e avaliações, desenvolvida do zero ao produto final.**

[Site online](https://polvinho.netlify.app/src/pages/login/index.html) · [Documentação](https://micapareddes.notion.site/Documenta-o-Polvinho-3a633e35d72a808ea4afdaed9641ad85?source=copy_link) · [Design](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-LabTIC)

[English](README.md) · [Español](README.es.md)

</div>

---

## Sobre

O Polvo Quiz centraliza o gerenciamento de quizzes e avaliações entre alunos e professores.
Os alunos podem visualizar suas disciplinas, realizar quizzes e acessar notas e gabaritos. Os professores
criam e gerenciam quizzes. Os administradores gerenciam alunos, professores e disciplinas.

Foi desenvolvido no **LabTIC**, um grupo de pesquisa formado por professores da ESAG/UDESC registrado no CNPq
desde 2002, como uma experiência prática de desenvolvimento de software: os líderes atuaram como clientes,
e conduzimos todo o ciclo, desde entrevistas de levantamento de requisitos até planejamento, modelagem de dados,
backend, frontend e entrega.

A arquitetura foi pensada visando escalabilidade futura. Os quizzes são a primeira funcionalidade do sistema,
não o único tipo de recurso que ele deve suportar.

O projeto está dividido em dois repositórios independentes, `polvo-front` e `polvo-back`, permitindo que
frontend e backend sejam publicados separadamente.

## Tecnologias

**Backend** Node.js · MongoDB · Mongoose  
**Frontend** HTML · JavaScript puro · Tailwind CSS  
**Design** Figma

## Funcionalidades

**Alunos**
- Visualizar as disciplinas do semestre
- Realizar quizzes publicados pelos professores
- Visualizar notas e gabaritos quando liberados pelo professor
- Visualizar notas e gabaritos de cada tentativa em quizzes com múltiplas tentativas
- Alterar senha

**Professores**
- Criar quizzes como provas, exercícios ou simulados
- Salvar quizzes como rascunho e editá-los posteriormente
- Excluir quizzes
- Ver quem respondeu, com suas respectivas notas e gabaritos
- Alterar senha

**Administradores**
- CRUD completo de alunos, professores e disciplinas
- Editar ou excluir quizzes criados pelos professores

## Restrições

Aplicadas pela API, não apenas pela interface:

- Administradores nunca possuem acesso à senha dos usuários.
- Administradores não criam a senha inicial; ela é gerada automaticamente durante o cadastro.
- O papel de um usuário é definido no momento do cadastro. Um professor não pode se tornar aluno e vice-versa.
- Alterar o papel exige a criação de uma nova conta com a função desejada.

## Design

O objetivo era criar uma plataforma educacional simples e envolvente, sem a complexidade normalmente encontrada
em ferramentas semelhantes. Como a equipe estava em fase inicial de aprendizado, o design evita propositalmente
CSS avançado e bibliotecas externas, mantendo o foco no aprendizado em vez de lidar com estilos complexos.

A paleta roxa e amarela foi inspirada na própria plataforma universitária Polvo, adaptada para uma identidade
mais leve e descontraída. O resultado busca equilibrar simplicidade, funcionalidade e apelo visual, sem
sobrecarregar o usuário.

[Ver o design no Figma](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-LabTIC)

## Estrutura do projeto

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

## Links

[Documentação](https://micapareddes.notion.site/LabTIC-Quiz-f9cd710a7509405dbcb5d88ed7f7e56e) · [Design](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-LabTIC) · [Site online](https://polvinho.netlify.app/src/pages/login/index.html)
