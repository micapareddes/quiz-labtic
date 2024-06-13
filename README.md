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
- Editar quizzes de rascunho.
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
