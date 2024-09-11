import { Router } from "express"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"
import RespostaController from '../controllers/respostaController.js'

const routerResposta = Router()

routerResposta.post("/new", authenticateToken, tryCatch(RespostaController.postResposta))

export default routerResposta