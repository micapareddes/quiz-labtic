</div>
    <div align=center>
    <img src="/frontend/src/img/logo-light.svg" width=100px>
</div>

![Polvo Capa](/frontend/src/img/capa.png)

## Objetivos do Software

O software é uma plataforma universitária projetada para facilitar a interação acadêmica entre alunos e professores através do gerenciamento centralizado de quizzes e avaliações. A plataforma permite que alunos visualizem disciplinas, realizem quizzes e acessem suas notas e gabaritos, enquanto professores podem criar e gerenciar quizzes. Administradores são responsáveis por gerenciar alunos, professores e disciplinas, garantindo a organização e funcionamento da plataforma. O design do software visa escalabilidade futura, permitindo a adição de novas funcionalidades conforme necessário.

## Tecnologias Utilizadas

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

## Links
[Documentação](https://www.notion.so/micapareddes/LabTIC-Quiz-f9cd710a7509405dbcb5d88ed7f7e56e) •
[Presentação do projeto](https://www.behance.net/gallery/202116443/Polvo) • 
[Design](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Polvo-Quiz-(LabTIC)?node-id=4174-8239&t=kWzpnkKfQa8pRwit-1)
