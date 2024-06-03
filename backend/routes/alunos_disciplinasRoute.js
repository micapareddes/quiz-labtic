import { Router } from "express"
import Aluno_DisciplinaController from "../controllers/aluno_disciplinaController.js"

const routerAlunoDisciplina = Router()

routerAlunoDisciplina.post("/relacao", Aluno_DisciplinaController.criarRelacao)

export default routerAlunoDisciplina