import { Router } from "express"
import Aluno_DisciplinaController from "../controllers/aluno_disciplinaController.js"

const routerAlunoDisciplina = Router()

routerAlunoDisciplina.get("/relacao_aluno/:aluno_id", Aluno_DisciplinaController.consultarRelacaoPorAluno)
routerAlunoDisciplina.post("/relacao", Aluno_DisciplinaController.criarRelacao)

export default routerAlunoDisciplina