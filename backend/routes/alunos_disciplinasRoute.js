import { Router } from "express"
import Aluno_DisciplinaController from "../controllers/aluno_disciplinaController.js"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"


const routerAlunoDisciplina = Router()

routerAlunoDisciplina.get("/", authenticateToken, tryCatch(Aluno_DisciplinaController.consultarRelacaoPorAluno))

routerAlunoDisciplina.get("/all_students", authenticateToken, tryCatch(Aluno_DisciplinaController.getAllStudents))

routerAlunoDisciplina.post("/", authenticateToken, tryCatch(Aluno_DisciplinaController.cadastrarAlunoADisciplinas))

routerAlunoDisciplina.delete("/", authenticateToken, tryCatch(Aluno_DisciplinaController.eliminarRelacaoPorDisciplinaId))

export default routerAlunoDisciplina