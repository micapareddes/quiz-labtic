import { Router } from "express"
import Aluno_DisciplinaController from "../controllers/aluno_disciplinaController.js"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"


const routerAlunoDisciplina = Router()

routerAlunoDisciplina.get("/", authenticateToken, tryCatch(Aluno_DisciplinaController.consultarRelacaoPorAluno))

routerAlunoDisciplina.get("/all_students", authenticateToken, tryCatch(Aluno_DisciplinaController.getAllStudents))

routerAlunoDisciplina.get("/student/:id", authenticateToken, tryCatch(Aluno_DisciplinaController.getStudentDataWithDisciplinasById))

routerAlunoDisciplina.get("/get", authenticateToken, tryCatch(Aluno_DisciplinaController.getDisciplinasDoAluno))

routerAlunoDisciplina.patch('/student/:id', authenticateToken, tryCatch(Aluno_DisciplinaController.editarCadastroDeDisciplinasDoAlunoById))

routerAlunoDisciplina.post("/", authenticateToken, tryCatch(Aluno_DisciplinaController.cadastrarAlunoADisciplinas))

routerAlunoDisciplina.delete("/disciplina", authenticateToken, tryCatch(Aluno_DisciplinaController.eliminarRelacaoPorDisciplinaId))

routerAlunoDisciplina.delete("/aluno", authenticateToken, tryCatch(Aluno_DisciplinaController.eliminarRelacaoPorAlunoId))

export default routerAlunoDisciplina