import { Router } from "express"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"
import quizController from "../controllers/quizController.js"

const routerQuiz = Router()

routerQuiz.get("/questions/:id", authenticateToken, tryCatch(quizController.getPerguntasQuiz))

routerQuiz.post("/new", authenticateToken, tryCatch(quizController.postNewQuiz))

export default routerQuiz