import { Router } from "express"
import DisciplinaController  from "../controllers/disciplinaController.js"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const routerDisciplina = Router()

routerDisciplina.get("/", authenticateToken, tryCatch(DisciplinaController.consultarDisciplinasPorProfessor))
routerDisciplina.post("/", tryCatch(DisciplinaController.criarDisciplina))

export default routerDisciplina