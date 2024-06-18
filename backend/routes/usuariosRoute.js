import { Router } from "express"
import UsuarioController  from "../controllers/usuarioController.js"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const routerUsuario = Router()

routerUsuario.post("/", authenticateToken, tryCatch(UsuarioController.criarUsuario))
routerUsuario.post("/login", tryCatch(UsuarioController.login))
routerUsuario.delete("/", authenticateToken, tryCatch(UsuarioController.eliminarUsuario))
routerUsuario.patch("/alterar_senha", authenticateToken, tryCatch(UsuarioController.alterarSenha))
routerUsuario.patch("/", authenticateToken, tryCatch(UsuarioController.editarUsuario))


export default routerUsuario