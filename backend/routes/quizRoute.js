import { Router } from "express"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"
import quizController from "../controllers/quizController.js"

const routerQuiz = Router()

routerQuiz.get("/questions_gabarito/:id", authenticateToken, tryCatch(quizController.getPerguntasQuizForGabarito))

routerQuiz.get("/student_infos/:id", authenticateToken, tryCatch(quizController.getInfosQuizForStudent))

routerQuiz.get("/professor_infos/:id", authenticateToken, tryCatch(quizController.getInfosQuizForProfessor))

routerQuiz.get("/prof/disciplina/:id", authenticateToken, tryCatch(quizController.getQuizzesPorDisciplinaIdParaProfessor))

routerQuiz.post("/embaralha/:id", authenticateToken, tryCatch(quizController.embaralharQuizESalvar))

routerQuiz.post("/new", authenticateToken, tryCatch(quizController.postNewQuiz))

export default routerQuiz