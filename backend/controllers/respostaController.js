import mongoose from "mongoose"
import ServidorError from "../ServidorError.js"
import { TOKEN_ERROR, ANSWER_ERROR } from "../constants/errorCodes.js"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloQuiz } from "../models/Quiz.js"
import { ModeloResposta } from "../models/Resposta.js"

class RespostaController {
    async postResposta(req, res) {
        const alunoId = req.userId
        const aluno = await ModeloUsuario.findById(alunoId, 'papel')
        const alunoInvalido = !aluno || aluno.papel !== 'aluno'
        if (alunoInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS) 
        
        const { quiz_id, respostas_perguntas } = req.body

        const quiz = await ModeloQuiz.findById(quiz_id, 'tentativas -_id')
        const totalDeTentativasDoQuiz = Number(quiz.tentativas)
        console.log('quiz:', quiz);
        console.log('total:', totalDeTentativasDoQuiz);
        
        const tentativasAluno = await ModeloResposta.countDocuments({ aluno_id: alunoId, quiz_id })
        console.log('aluno: ', tentativasAluno);
        console.log('validacao: ', totalDeTentativasDoQuiz !== 0 );

        
        if (totalDeTentativasDoQuiz !== 0 && tentativasAluno >= totalDeTentativasDoQuiz) throw new ServidorError(ANSWER_ERROR.NO_MORE_ATTEMPTS)

        await ModeloResposta.create({
            aluno_id: alunoId,
            quiz_id,
            respostas_perguntas
        })
        return res.status(204).send()
    }
}

export default new RespostaController()