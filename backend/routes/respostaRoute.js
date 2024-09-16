import { Router } from "express"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"
import RespostaController from '../controllers/respostaController.js'

const routerResposta = Router()

routerResposta.post("/new/:id", authenticateToken, tryCatch(RespostaController.postResposta))

routerResposta.get("/quiz/:id", authenticateToken, tryCatch(RespostaController.getQuizEmbaralhado))

routerResposta.get("/gabarito/:id", authenticateToken, tryCatch(RespostaController.getGabarito))

export default routerResposta