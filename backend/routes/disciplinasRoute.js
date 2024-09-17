import { Router } from "express"
import DisciplinaController  from "../controllers/disciplinaController.js"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const routerDisciplina = Router()

routerDisciplina.get("/professor", authenticateToken, tryCatch(DisciplinaController.mostrarDisciplinasDoProfessor))
routerDisciplina.get("/cadastradas", authenticateToken, tryCatch(DisciplinaController.listarDisciplinasCadastradas))
routerDisciplina.get("/name/:id", authenticateToken, tryCatch(DisciplinaController.getName))
routerDisciplina.get("/:id", authenticateToken, tryCatch(DisciplinaController.listarInformaçõesPorId)) //TODO: Mudar rota para /info/:id
routerDisciplina.get("/quiz/:id", authenticateToken, tryCatch(DisciplinaController.getQuizzesInfoByDisciplinaId))
routerDisciplina.post("/", authenticateToken, tryCatch(DisciplinaController.criarDisciplina))
routerDisciplina.patch("/professor/:id", authenticateToken, tryCatch(DisciplinaController.editarProfessorDeDisciplinasPorId))
routerDisciplina.patch("/editar/:id", authenticateToken, tryCatch(DisciplinaController.editarDisciplina))
routerDisciplina.patch("/", authenticateToken, tryCatch(DisciplinaController.cadastrarProfessorADisciplinas))
routerDisciplina.patch("/quiz", authenticateToken, tryCatch(DisciplinaController.adicionarQuizADisciplina))

routerDisciplina.delete("/", authenticateToken, tryCatch(DisciplinaController.eliminarDisciplinaEDependencias))
routerDisciplina.delete("/professor", authenticateToken, tryCatch(DisciplinaController.removeProfessorFromDisciplinas))

export default routerDisciplina