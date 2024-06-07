import { Router } from "express"
import Aluno_DisciplinaController from "../controllers/aluno_disciplinaController.js"
import { tryCatch } from "../utils/tryCatch.js"

const routerAlunoDisciplina = Router()

routerAlunoDisciplina.get("/:aluno_id", tryCatch(Aluno_DisciplinaController.consultarRelacaoPorAluno))
routerAlunoDisciplina.post("/", tryCatch(Aluno_DisciplinaController.criarRelacao))

export default routerAlunoDisciplina