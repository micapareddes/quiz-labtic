import { Router } from "express"
import UsuarioController  from "../controllers/usuarioController.js"
import { tryCatch } from "../utils/tryCatch.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const routerUsuario = Router()

routerUsuario.get("/me", authenticateToken, tryCatch(UsuarioController.tipoDoUsuario))
routerUsuario.get("/name", authenticateToken, tryCatch(UsuarioController.consultarNome))
routerUsuario.get("/professores", authenticateToken, tryCatch(UsuarioController.listarTodosPorfessores))
routerUsuario.get("/all_professores", authenticateToken, tryCatch(UsuarioController.listarTodosProfessoresComDisciplinas)) //TODO: mudar nome de all_professores para professores_disciplinas
routerUsuario.get("/user_data/:id", authenticateToken, tryCatch(UsuarioController.listarInformacoesPorId))
routerUsuario.get("/professor_disciplina/:id", authenticateToken, tryCatch(UsuarioController.getProfessorDataWithDisciplinasById))

routerUsuario.post("/", authenticateToken, tryCatch(UsuarioController.criarUsuario))
routerUsuario.post("/login", tryCatch(UsuarioController.login))

routerUsuario.delete("/", authenticateToken, tryCatch(UsuarioController.eliminarUsuario))

routerUsuario.patch("/alterar_senha", authenticateToken, tryCatch(UsuarioController.alterarSenha))
routerUsuario.patch("/user/:id", authenticateToken, tryCatch(UsuarioController.editarUsuario))


export default routerUsuario