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
        
        const respostaId = req.params.id
        const { quiz_id, respostas_perguntas } = req.body

        const quiz = await ModeloQuiz.findById(quiz_id, 'tentativas -_id')
        const totalDeTentativasDoQuiz = Number(quiz.tentativas)
        const tentativasAluno = await ModeloResposta.countDocuments({ aluno_id: alunoId, quiz_id })
        if (totalDeTentativasDoQuiz !== 0 && tentativasAluno >= totalDeTentativasDoQuiz) throw new ServidorError(ANSWER_ERROR.NO_MORE_ATTEMPTS)

        const perguntasQuiz = await ModeloResposta.findById(respostaId, 'perguntas_quiz -_id')
        const perguntas = perguntasQuiz.perguntas_quiz
        
        const idsAlternativasCorretas = perguntas.map(pergunta => {
            const alternativaCorreta = pergunta.alternativas.find(alternativa => alternativa.isCorreta)
            return alternativaCorreta && alternativaCorreta._id.toString()
        })
        const setIdsAlternativasCorretas = new Set(idsAlternativasCorretas)
        let notaAluno = 0
        const gabaritoAluno = respostas_perguntas.map((resposta) => {
            const alternativaId = resposta.alternativa_id ? resposta.alternativa_id.toString() : null
            const acertou = setIdsAlternativasCorretas.has(alternativaId)
            if (acertou) notaAluno += 1
            return {
                pergunta_id: resposta.pergunta_id,
                alternativa_id: resposta.alternativa_id,
                acertou,
            }
        })
        
        await ModeloResposta.findByIdAndUpdate(respostaId, { nota: notaAluno, gabarito: gabaritoAluno })

        return res.status(204).send()
    }

    async getGabarito(req, res) {
        const id = req.params.id
        const gabarito = await ModeloResposta.findById(id, 'nota gabarito perguntas_quiz nome_quiz').populate('disciplina_id', 'nome')
        if (!gabarito) throw new ServidorError(ANSWER_ERROR.DOESNT_EXIST)

        res.status(200).json(gabarito)
    }

    async getQuizEmbaralhado(req, res) {
        const alunoId = req.userId
        const aluno = await ModeloUsuario.findById(alunoId, 'papel')
        const alunoInvalido = !aluno || aluno.papel !== 'aluno'
        if (alunoInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS) 

        const respostaId = req.params.id
        const quizEmbaralhado = await ModeloResposta.findById(respostaId, 'nome_quiz tempo_quiz perguntas_quiz.pergunta perguntas_quiz._id perguntas_quiz.alternativas.conteudo perguntas_quiz.alternativas._id quiz_id').populate('disciplina_id', 'nome')

        res.status(200).json(quizEmbaralhado)
    }
}

export default new RespostaController()