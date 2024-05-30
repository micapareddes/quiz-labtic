import { Router } from "express"
import UsuarioController  from "../controllers/usuarioController.js"

const routerUsuario = Router()

routerUsuario.post("/usuario", UsuarioController.criarUsuario)
routerUsuario.delete("/usuario", UsuarioController.eliminarUsuario)
routerUsuario.patch("/usuario/:id", UsuarioController.editarUsuario)

export default routerUsuario