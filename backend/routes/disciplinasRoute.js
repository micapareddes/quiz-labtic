import { Router } from "express"
import DisciplinaController  from "../controllers/disciplinaController.js"
import { tryCatch } from "../utils/tryCatch.js"

const routerDisciplina = Router()

routerDisciplina.post("/", tryCatch(DisciplinaController.criarDisciplina))

export default routerDisciplina