// este arquivo guarda todas nosas rotas em um lugar só, facilitando a implementação no servidor.js
// -------------------------------
import { Router } from "express"
import routerUsuario from "./usuariosRoute.js"
import routerDisciplina from "./disciplinasRoute.js"
import routerAlunoDisciplina from "./alunos_disciplinasRoute.js"
import routerQuiz from "./quizRoute.js"
import routerResposta from "./respostaRoute.js"

export const router = Router()

router.use("/usuarios", routerUsuario)
router.use("/disciplinas", routerDisciplina)
router.use("/alunos_disciplinas", routerAlunoDisciplina)
router.use("/quiz", routerQuiz) //TODO: mudar para quizzes 
router.use("/respostas", routerResposta)