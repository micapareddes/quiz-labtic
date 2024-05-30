import { Router } from "express"
import Usuario_DisciplinaController from "../controllers/usuario_disciplinaController.js"

const routerUsuarioDisciplina = Router()

routerUsuarioDisciplina.post("/relacao", Usuario_DisciplinaController.criarRelacao)

export default routerUsuarioDisciplina