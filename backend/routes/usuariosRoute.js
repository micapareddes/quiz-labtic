import { Router } from "express"
import UsuarioController  from "../controllers/usuarioController.js"
import { tryCatch } from "../utils/tryCatch.js"

const routerUsuario = Router()

routerUsuario.post("/", tryCatch(UsuarioController.criarUsuario))
routerUsuario.delete("/", tryCatch(UsuarioController.eliminarUsuario))
routerUsuario.patch("/:id", tryCatch(UsuarioController.editarUsuario))

export default routerUsuario