// este arquivo guarda todas nosas rotas em um lugar só, facilitando a implementação no servidor.js
// -------------------------------
import { Router } from "express"
import routerUsuario from "./usuariosRoute.js"
import routerDisciplina from "./disciplinasRoute.js"
import routerUsuarioDisciplina from "./usuarios_disciplinasRoute.js"

export const router = Router()

router.use("/usuarios", routerUsuario)
router.use("/disciplinas", routerDisciplina)
router.use("/usuarios_disciplinas", routerUsuarioDisciplina)